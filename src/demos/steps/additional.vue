<template>
    <div class = "row form-container">
        <div class="col-md-12">
            <h4>Additional Information</h4>
            <p>Provide additional information to specify your request, We will answer you as soon as possible</p>
        </div>
        
        <div class="col-md-12">
            <div class="form-group messageForm">
                <label for="message">Your Message *</label>
                <textarea-autosize
                    ref="myTextarea"
                    class="form-control"
                    v-model="formData.message"
                    :on-change="changeState()"
                    :min-height="100"
                    :max-height="100"
                    :class="hasError('message') ? 'is-invalid' : ''"
                />
                <div class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.message.maxLength">Please input under 600 characteristics.</div>
                    <div class="error" v-if="!$v.formData.message.required">This field is required.</div>
                </div>
                <div class="numberTag">{{charCount}}/600</div>
            </div>
        </div>
        
        <div class="col-md-12">
            <div class="form-group">
                <label for="receive">Marketing Email Subscription</label>
                <div style="display:flex;">
                    <input
                        type="checkbox"
                        v-model="formData.receive"
                        true-value="yes"
                        false-value="no"
                        style="width:25px; height : 25px; margin-right : 10px"
                    />
                    <label for="checkbox">I would like to receive marketing emails about products, promotions and other news.</label>
                </div>
                <div style='font-size:12px'>
                    By checking the "Marketing email subscription" box I agree and confirm that I would like to receive advertising material from Guardian by e-mail with information about Guardian and its products. I understand I can revoke my consent at any time by clicking the "unsubscribe" link in the fotter of all Marketing e-mail communications. For information on how your personal data is used by Guardian please review our Privacy Policy.
                </div>
            </div>
        </div>
        
        <div class="col-md-6">
            <div class="form-group">
                <label for="recaptcha">Security check*</label>
                <vue-recaptcha sitekey="6Le2QiAaAAAAABwLJHk3M_xATE1AUr64biNE_H4A">
                    <button>Click me</button>
                </vue-recaptcha>
            </div>
        </div>
    </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

import ValidationHelper from '../../components/ValidationHelper.vue';
import { required, maxLength } from 'vuelidate/lib/validators'

import {store} from '../../components/store.js'
import { mapActions, mapGetters } from 'vuex'

export default {
    name : "CommunicationAddress",
    mixins: [ValidationHelper],
    components: {
        VueRecaptcha 
    },
    mounted() {
        this.charCount = this.formData.message != null ? this.formData.message.length : 0
    },
    data () {
        return {
            charCount : 0,
            formData : store.state.formData
        }
    },
    validations:{
        formData : {
            message: {
                required, 
                maxLength : maxLength(600)
            }, 
            // reCaptcha: {required}, 
        }
    },

    methods : {
        ...mapActions(['setIsNextable']),
        async changeState() {
            this.charCount = this.formData.message.length
            if (this.formData.message.length >=1 )
                this.storeState.v.$touch();
            if (!this.$v.formData.$invalid)
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

.numberTag {
    position :absolute;
    top : 135px;
    right : 0px;
    color : black;
}

.messageForm{
    position:relative;
    margin-bottom: 20px;
}
</style>