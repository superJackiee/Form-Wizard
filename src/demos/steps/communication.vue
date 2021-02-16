<template>
    <div class = "row form-container">
        <div class="col-md-12">
            <h4>Communication Address</h4>
            <p>Enter your communication address</p>
        </div>

        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="country">Country*</label>
                <country-select
                    v-model = "formData.country"
                    :country="formData.country"
                    topCountry="US"
                    :on-change="changeState()"
                    class="form-control"
                    :class="hasError('country') ? 'is-invalid' : ''" 
                />
                <div class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.country.required">Please provide a valid name.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="state">State/Province*</label>
                <region-select  
                    v-model = "formData.state"
                    :country="formData.country"
                    :on-change="changeState()"
                    :region="formData.state"
                    class="form-control"
                    :class="hasError('state') ? 'is-invalid' : ''" 
                />
                <div class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.state.required">Please provide a valid name.</div>
                </div>
            </div>
        </div>

        <div class="col-md-12">
            <div class="form-group">
                <label for="address1">Address 1*</label>
                <input type="text" class="form-control" :class="hasError('address1') ? 'is-invalid' : ''" placeholder="Address 1" v-model="formData.address1" @change="changeState()">
                <div class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.address1.required">Please provide a address1.</div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="form-group">
                <label for="address2">Address 2*</label>
                <input type="text" class="form-control" :class="hasError('address2') ? 'is-invalid' : ''" placeholder="Address 2" v-model="formData.address2" @change="changeState()">
                <div class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.address2.required">Please provide a address2.</div>
                </div>
            </div>
        </div>
        
        
        <div class="col-md-6">
            <div class="form-group">
                <label for="city">City*</label>
                <input type="text" class="form-control" :class="hasError('city') ? 'is-invalid' : ''" placeholder="City" v-model="formData.city" @change="changeState()">
                <div class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.city.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>

        <div class="col-md-6 langArea">
            <div class="form-group">
                <label for="zipCode">Zip Code*</label>
                <input type="text" class="form-control" :class="hasError('zipCode') ? 'is-invalid' : ''" placeholder="Zip Code" v-model="formData.zipCode" @change="changeState()">

                <div class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.zipCode.required">Please provide valid input.</div>
                    <div class="error" v-if="!$v.formData.zipCode.numeric">Please provide valid input.</div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import vueCountryRegionSelect from 'vue-country-region-select'

import ValidationHelper from '../../components/ValidationHelper.vue';
import { required, numeric } from 'vuelidate/lib/validators'

import {store} from '../../components/store.js'
import { mapGetters, mapActions} from 'vuex'

export default {
    name : "CommunicationAddress",
    mixins: [ValidationHelper],
    components: {
        vSelect,
        vueCountryRegionSelect
    },
    computed:{
    },
    data () {
        return {
            formData : store.state.formData,
            languages : ['English','Chinese','German', 'Spanish', 'Korean']
        }
    },
    validations:{
        formData : {
            country: {required}, 
            state: {required}, 
            address1: {required}, 
            address2: {required},
            city: {required},
            zipCode: {required, numeric},
        }
    },
    methods : {
        ...mapActions(['setIsNextable']),
        async changeState() {
            if (this.formData.country 
                && this.formData.state 
                && this.formData.address1 
                && this.formData.address2 
                && this.formData.city 
                && this.formData.zipCode)
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
</style>