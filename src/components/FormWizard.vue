<template>
<div class="container  vue-step-wizard row">
        <div class="col-md-3 step-side">
          <div class = "form-title" >
            <h6 class = "title">Contact Form</h6>
            <div class="break"></div>
          </div>

          <ul v-if="!mobile && tabs.length" class="step-pills">
              <li @click="selectTab(0)" class="step-item" :class="{ 'active': tabs[0].isActive }" >
                  <a class="step-link" href="#">
                    <span class="tabStatus">{{1}} </span> 
                    <span class="tabLabel">{{tabs[0].title}}</span>
                  </a>
              </li>
              <li class="step-item" >
                  <a @click="selectTab(1)"  class="step-link" href="#" :class="{ 'subli-name-active': tabs[1].isActive | tabs[2].isActive }" >
                    <span class="tabStatus">{{2}} </span> 
                    <span class="tabLabel">{{tabs[1].title}}</span>
                  </a>
                  <div class="sub-li">
                    <a @click="selectTab(1)" class="step-link" href="#" :class="{ 'subli-active': tabs[1].isActive }" >
                      <span class="tabLabel">Personal Information</span>
                    </a>

                    <a @click="selectTab(2)" class="step-link" href="#" :class="{ 'subli-active': tabs[2].isActive }" >
                      <span class="tabLabel">Communication Address</span>
                    </a>
                  </div>
              </li>
              <li @click="selectTab(3)" class="step-item" :class="{ 'active': tabs[3].isActive }" >
                  <a class="step-link" href="#">
                    <span class="tabStatus">{{3}} </span> 
                    <span class="tabLabel">{{tabs[3].title}}</span>
                  </a>
              </li>
          </ul>

          <div v-if="mobile" class="mobileSideBar">
            STEP {{currentTab + 1}}/{{totalTabs-1}}
          </div>
        </div>

        <div class="col-md-9 step-body">
          <slot></slot>
          <div class="step-footer" >
            <!-- <template v-if="successed == null"> -->
            <template v-if="successed == null">
              <button v-if="currentTab!=0" @click="previousTab" :disabled="currentTab === 0" class="step-button step-button-previous">Back</button>
              <button style="visibility:hidden">aa</button>
              <button @click="nextTab" :disabled="!nextable" v-if="currentTab < totalTabs - 1" class="step-button step-button-next" v-bind:class="{activeButton : nextable, disabledButton : !nextable}">Next</button>
              <button @click="onSubmit" :disabled="!nextable" v-if="currentTab == totalTabs-1" class="step-button step-button-submit" v-bind:class="{activeButton : nextable, disabledButton : !nextable}">Send</button>
              <div v-if="warningShow" class="warningSend">
                Submission failed due to error, please try again. 
                <div>
                  <v-icon name="alert-triangle" class = 'icon-failed'></v-icon>
                </div>
              </div>
            </template>
          </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions} from 'vuex'
import { store } from "./store.js";

export default {
    name: 'form-wizard',
    data(){
        return{
            mobile : false,
            tabs: [],
            currentTab : 0,
            totalTabs : 0,
            storeState: store.state,
            submitSuccess : false,
            progress: 0,
            isValidationSupport: false,
            warningShow : false,
        }
    },
    computed : {
      ...mapGetters({
        nextable : 'getIsNextable',
        successed : 'getSuccessed',
        failedCount : 'getFailedCount',
      })
    },
    mounted() {
        this.setSuccessed({successed:null})
        this.setFailedCount({failedCount:0})
        this.nextable({nextable:false})
    },
    mounted(){
      this.tabs = this.$children;
      this.mobile = this.isMobile();
      this.totalTabs = this.tabs.length;
      this.currentTab = this.tabs.findIndex((tab) => tab.isActive === true);

      //Select first tab if none is marked selected
      if(this.currentTab === -1 && this.totalTabs > 0){  
          this.tabs[0].isActive = true;
          this.currentTab = 0;
      }
    },

    updated(){
        /*
          Using this lifehook - since store variable gets updated after component is mounted
          isValidationSupport checks if user is looking to perform validation on each step
        */
        this.isValidationSupport = (Object.keys(this.storeState.v).length !== 0 && this.storeState.v.constructor === Object) ? true : false;
    },

    methods:{
      ...mapActions([
        'setIsNextable',
        'setFailedCount',
        'setSuccessed',
        'sendAllData',
        'setWizardForm'
      ]),
      isMobile() {
        if (screen.width <= 760) {
          return true
        } else {
          return false
        }
      }, 
      previousTab(){
          this._switchTab(this.currentTab - 1);

          this.$emit('onPreviousStep'); 
      },

      nextTab(){
        this.setSuccessed({successed:null})
        this.setIsNextable({nextable: false})

        if(this._validateCurrentTab() === false)
            return;

        this._switchTab(this.currentTab + 1);    
        this.$emit('onNextStep');          
      },

      reset(){

          this.tabs.forEach(tab => {
            tab.isActive = false;
            tab.isValidated = false;
          });

          this._switchTab(0);
          this.submitSuccess = false;
          this.storeState.v.$reset();

          this.$emit('onReset');
      },

      changeStatus(){
          this.submitSuccess = true;
      },

      selectTab(index){
        this.setSuccessed({successed:null})
        if(index < this.currentTab){
          this._switchTab(index);
        }

        if(this._validateCurrentTab() === false){
            return;
        }

        if(this.tabs[index - 1].isValidated === false){
            return;
        }

        this._switchTab(index);
      },


      async onSubmit(){
          if(this._validateCurrentTab() === false)
              return;
          
          let response = 'failed';
          await this.setWizardForm({formData:this.storeState.formData});

          await this.sendAllData()
            .then(res => {
              response = res
            })
          if (response == 'failed') {
            if (this.failedCount >= 3) {
              this.setSuccessed({successed:'failed'})
            }
            this.warningShow = true;
          } else {
              this.setSuccessed({successed:'successed'})
            this.$emit('onComplete');
          }
      },

      _switchTab(index){
          //Disable all tabs
          this.tabs.forEach(tab => {
            tab.isActive = false;
          });

          this.currentTab = index;
          this.tabs[index].isActive = true;

          this.progress = ((this.currentTab + 1) / this.totalTabs * 100);
      },

      _validateCurrentTab(){
          if(!this.isValidationSupport)  //Check if user wants to validate 
              return true;

          this.storeState.v.$touch();

          if (this.storeState.v.$invalid) {
              this.tabs[this.currentTab].isValidated = false;
              return false;
          }

          this.tabs[this.currentTab].isValidated = true;

          return true;
      }
    },
    watch:{
       currentTab(){
          store.setCurrentTab(this.currentTab);
       }
    }
    
}
</script>
<style lang = "scss">

  .warningSend {
    position : absolute;
    right : 8px;
    bottom : -15px;
    color : red;
    font-size : 12px;
    display:flex;
    flex-direction : row;
    justify-content : space-between;
    div {
      margin-left : 5px;
      width : 16px;
    }
  }
  .sub-li {
    padding-left : 35px;
    display:flex;
    flex-direction : column;
    a {
      margin-top : 5px;
    }
    .subli-active {
      font-weight :bold !important;
      color : black !important;
    }
  }
  .subli-name-active {
      font-weight :bold !important;
      color : black !important;
  }
  .vue-step-wizard{
    margin: 0px !important;
    min-height : 700px;
    max-height : 700px;
  }

  .activeButton {
    background-color: #126fde
  }

  .disabledButton {
    background-color: #126fde;
    opacity: 0.6;
  }

  .step-side {
    background : white;
    .form-title {
      padding : 30px 0px 0px 20px;
      .title {
        font-weight :bold;
        color : blue; 
      }
      .break{
        margin-top : 15px;
        min-height : 2px;
        background : #1e1e1e;
        width : 50px;
      }
    }
  }

  .step-pills{
    margin-top : 60px;
    background-color: white;
    padding : 0px 0px 0px 20px;

    .step-item{
      background-color: #F5F5F5;
      border-radius: 10px;
      list-style-type: none;
      font-size : 12.5px;
      a{
        text-decoration: none;
        color: #ABABAB;
        
        /** Wizard Ends */
        .tabStatus{
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          margin-right: .5rem;
          line-height: 1.5rem;
          color: black;
          text-align: center;
          background: white;
          border-radius: 50%;
          border: 1px solid green;
        }
      }
      margin-bottom : 45px;
    }
    
    .step-item.active{
      a{
        color : #000;
        font-weight : bold;
      }
    }
    .step-item.validated{
      .tabStatus { 
        background : #00eecc;
        border : none;
      }
    }
  }


  .step-body{
    background-color: #EbEbEb;
    margin-left: auto;
    padding: 2rem 5rem 2rem 4rem !important;
    display : flex;
    flex-direction : column;
    justify-content : space-between;

    .step-footer{
      position : relative;
      display :flex;
      flex-direction : row;
      justify-content : space-between;
      align-items : center;

      .step-button{
        font-weight: 700;
        width : 125px;
        line-height: 1;
        text-transform: uppercase;
        position: relative;
        max-width: 30rem;
        text-align: center;
        border: 1px solid;
        color: #22292f;
        color: rgba(34,41,47,var(--text-opacity));
        padding: 0.5rem 1.25rem;
        font-size: .875rem;
        margin: 0.5rem;
        color: #fff;
        outline: none !important;
        box-shadow: none !important;
      }

      .step-button-next{
        background-color: #126fde;
      }

      .step-button-previous{
        background-color: #3deaba;
      }

      .step-button-submit{
        background-color: #4fa203;
      }

      .step-button-reset{
        background-color: #037da2;
      }
    }
  }

  .mobileSideBar {
    display:flex;
    justify-content:center;
    height : 50px;
    align-items: center
  }
    
  @media only screen and  (max-device-width : 760px) {
    .step-body {
      padding : 1rem 2rem !important;
    }
    .form-title {
      display:flex;
      flex-direction:column;
      height : 50px;
      align-items: center;
      .break{
        min-height : 2px;
        background : #1e1e1e;
        width : 50px;
      }
      margin-bottom : 30px;
    }
  }
</style>