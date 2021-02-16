<template>
    <div class = "row form-container">
        <div class="col-md-12">
            <h4>Personal Information</h4>
            <p>Tell me more about your in order to be contacted</p>
        </div>

        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="firstName">First Name*</label>
                <input type="text" class="form-control" :class="hasError('firstName') ? 'is-invalid' : ''" placeholder="First Name" v-model="formData.firstName" @change="changeState()">
                <div v-if="hasError('firstName')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.firstName.required">Please provide a valid name.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="lastName">Last Name*</label>
                <input type="text" class="form-control" :class="hasError('lastName') ? 'is-invalid' : ''" placeholder="Last Name" v-model="formData.lastName" @change="changeState()">
                <div v-if="hasError('lastName')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.lastName.required">Please provide a valid name.</div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="form-group">
                <label for="emailAddress">Email*</label>
                <input type="email" class="form-control" :class="hasError('emailAddress') ? 'is-invalid' : ''" placeholder="Email Address" v-model="formData.emailAddress" @change="changeState()">
                <div v-if="hasError('emailAddress')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.emailAddress.email">Please provide a email.</div>
                    <div class="error" v-if="!$v.formData.emailAddress.required">Please provide a valid email.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="emailConfirmation">Email Confirmation*</label>
                <input type="email" class="form-control" 
                    :class="hasError('emailConfirmation') ? 'is-invalid' : ''" 
                    placeholder="Email Confirmation" 
                    v-model="formData.emailConfirmation"
                    @change="changeState()"
                >
                <div v-if="hasError('emailConfirmation')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.emailConfirmation.sameAsEmailAddress">Please select on of the fields.</div>
                </div>
            </div>
        </div>
        
        <div class="col-md-6">
            <div class="form-group">
                <label for="phoneNumber">Phone Number*</label>
                <VuePhoneNumberInput 
                    @change="changeState()"
                    v-model="formData.phoneNumber"  
                    :class="hasError('phoneNumber') ? 'is-invalid' : ''" 
                    />
                <div v-if="hasError('phoneNumber')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.phoneNumber.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>

        <div class ="col-md-6"></div>
        
        <div class="col-md-6 langArea">
            <div class="form-group">
                <label for="preferLang">Prefered Language*</label>
                    <v-select 
                        v-model="formData.preferLang"
                        label="preferLang"
                        :options="languages"
                        :on-change="changeState()"
                        :class="hasError('preferLang') ? 'is-invalid' : ''" 
                        class="style-chooser"/>
                <div v-if="hasError('preferLang')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.preferLang.required">Please select on of the fields.</div>
                </div>
            </div>
            <div class="langInfo">
                <v-icon name="alert-circle" v-tooltip="{content : 'Prefered lanuage is defined'}"></v-icon>
            </div>
        </div>
    
    </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { VueTelInput } from 'vue-tel-input'
import VTooltip from 'v-tooltip'

import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import VuePhoneNumberInput from 'vue-phone-number-input';


import ValidationHelper from '../../components/ValidationHelper.vue';
import { required, email, sameAs } from 'vuelidate/lib/validators'

import {store} from '../../components/store.js'
import { mapGetters, mapActions} from 'vuex'

export default {
    name : "PersonalInformation",
    mixins: [ValidationHelper],
    components: {
        vSelect,
        VueTelInput,
        VTooltip,
        VuePhoneNumberInput
    },
    data () {
        return {
            formData : store.state.formData,
            languages : ['English','Chinese','German', 'Spanish', 'Korean']
        }
    },
    validations:{
        formData : {
            firstName: {required}, 
            lastName: {required}, 
            emailAddress: {required, email}, 
            emailConfirmation: { sameAsEmailAddress : sameAs('emailAddress') },
            phoneNumber: {required},
            preferLang: {required},
        }
    },
    methods : {
        ...mapActions(['setIsNextable']),
        async changeState() {
            if (this.formData.firstName 
                && this.formData.lastName 
                && this.formData.emailAddress 
                && this.formData.emailConfirmation 
                && this.formData.phoneNumber 
                && this.formData.preferLang)
                await this.setIsNextable({nextable:true})
            else
                await this.setIsNextable({nextable:false})
        }
    }
}
</script>

<style scoped lang="scss">
.form-container {
    padding-top : 50px;
}
// .style-chooser{
//     // background: white !important;
//     // height : calc(1.5em + .75rem + 2px) !important;
// }
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
    background: white;
    height : calc(1.5em + .75rem + 2px) !important;
}

.langArea {
    position : relative;
    .langInfo {
        position : absolute;
        right : -20px;
        top : 40px;
        height : 25px;
        width : 25px;
        color : green
    }
}

.tooltip {
  display: block !important;
  z-index: 1000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1001;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;
    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;
    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;
    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>