<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <form-wizard ref="formwizard" @onComplete="onComplete" @onNextStep="nextStep" @onPreviousStep="previousStep" @onReset="reset">
                        <tab-content title="YOUR REQUIREMENTS" :selected="true">
                            <requirement v-if="successed == null"></requirement>
                        </tab-content>
                        <tab-content title="ABOUT YOU">
                            <personal-information v-if="successed == null"></personal-information>
                        </tab-content>
                        <tab-content title="COMMUNICATION">
                            <communication-address v-if="successed == null"></communication-address>
                        </tab-content>
                        <tab-content title="AdditionalInformation">
                            <additional-information v-if="successed == null"></additional-information>
                        </tab-content>
                        
                        <success-component v-if="successed == 'success'" @destroy="destoryModal" ></success-component>
                        <error-component v-if="successed == 'failed'" @destroy="destoryModal" ></error-component>
                    </form-wizard>
                    <a href ="#" @click="destoryModal()"><h2 class="closeButton">X</h2></a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import FormWizard from '../components/FormWizard.vue';
import TabContent from '../components/TabContent.vue';
import ValidationHelper from '../components/ValidationHelper.vue';
import { required, email, numeric, maxLength, sameAs } from 'vuelidate/lib/validators';


import Requirement from './steps/requirement.vue'
import PersonalInformation from './steps/per_information.vue'
import communicationAddress from './steps/communication.vue'
import AdditionalInformation from './steps/additional.vue'

import SuccessComponent from './steps/success.vue'
import ErrorComponent from './steps/error.vue'


const checked = (value) => value === true;
import {store} from "../components/store.js"
import { mapGetters, mapActions} from 'vuex'


export default {
    name: 'WizardStepper',
    components: {
        FormWizard,
        TabContent,
        Requirement,
        PersonalInformation,
        communicationAddress,
        AdditionalInformation,
        SuccessComponent,
        ErrorComponent
    },
    data(){
        return {
            formData: store.state.formData
        }
    },
    computed :{
        ...mapGetters({
            successed: 'getSuccessed'
        }),
    },

    mounted() {
        this.setSuccessed({successed:null})
    },
    methods:{
        ...mapActions([
            'setSuccessed'
        ]),
        destoryModal() {
            this.reset()
            console.log('ee');
            this.$emit('close') 
        },
        onComplete(){
            //alert("Submitting Form ! Rock On");
            //this.setSuccessed({successed: 'success'})
        },

        reset(){
            for(let field in this.formData){
                this.formData[field] = null;
            }
        },

        nextStep(){
            //alert("On Next Step");
        },

        previousStep(){
            //alert("On Previous Step");
        }
    }
}
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content :center;
  align-items:center;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  transition: .3s cubic-bezier(.25,.8,.25,1);
  font-family: Helvetica, Arial, sans-serif;
    position : relative;
    .modal-header {
        margin-top : 10px;
        display:flex;
        flex-direction :column;
        justify-content : center !important;
        align-items:center;
        color : rgba(0,0,0,.6);
        margin-bottom: -1px;
    }
    .modal-footer {
        height : 30px;
        display:flex;
        flex-direction :column;
        justify-content : space-between !important;
        margin-bottom:20px;
    }
}


.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.closeButton{
    position : absolute;
    right: 30px;
    top:10px;
}

</style>