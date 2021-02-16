<template>
    <div class = "row form-container">
        <div class="col-md-12">
            <h4>Your requirements</h4>
            <p>Explain us who you are and the reason of your request</p>
        </div>
        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="job">I work as*</label>
                <v-select 
                    v-model="formData.job"
                    label="countryName"
                    :options="jobs"
                    class="style-chooser"
                    :class="hasError('job') ? 'is-invalid' : ''"
                />
                <div v-if="hasError('job')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.job.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6 pt-4">
            <div class="form-group">
                <label for="companyName">Your Company Name</label>
                <input type="text" class="form-control" :class="hasError('companyName') ? 'is-invalid' : ''" placeholder="Company Name" v-model="formData.companyName" :on-change="changeState()">
                <div v-if="hasError('companyName')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.companyName.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="interested">Interested in glass for*</label>
                <v-select 
                    v-model="formData.interested"
                    label="countryName"
                    :options="interests"
                    :on-change="changeState()"
                    :class="hasError('interested') ? 'is-invalid' : ''"
                    class="style-chooser"/>
                <div v-if="hasError('interested')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.interested.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="benefit">With benefits such as*</label>
                <v-select 
                    v-model="formData.benefit"
                    label="benefit"
                    :options="benefits"
                    :on-change="changeState()"
                    :class="hasError('benefit') ? 'is-invalid' : ''"
                    class="style-chooser"
                />
                <div v-if="hasError('benefit')" class="invalid-feedback">
                    <div class="error" v-if="!$v.formData.benefit.required">Please select on of the fields.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { store } from '../../components/store.js'
import { mapGetters, mapActions} from 'vuex'

import ValidationHelper from '../../components/ValidationHelper.vue';
import { required, email } from 'vuelidate/lib/validators';

export default {
    name : "Requirement",
    components: {
        vSelect
    },
    mixins: [ValidationHelper],
    validations:{
        formData : {
            job:            {required}, 
            companyName:    {required}, 
            interested:     {required}, 
            benefit:        {required}
        },
    },
    components: {
        vSelect
    },
    mounted () {},
    data () {
        return {
            formData : store.state.formData,
            jobs : [
                'architect', 'barber', 'cook', 'developer'
            ],
            interests : [
                'Facades', 'Gacades', 'Hacades'
            ],
            benefits : [
                'Solar Protection', 'Wind Force', 'Heat'
            ],
        }
    },
    methods : {
        ...mapActions(['setIsNextable']),
        async changeState() {
            if (this.formData.job && this.formData.companyName && this.formData.interested && this.formData.benefit)
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