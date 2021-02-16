<template>
    <div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { store } from "./store.js";
export default {
    name: 'ValidationHelper',
    mixins: [validationMixin],
    data(){
        return{
            storeState: store.state,
        }
    },
    mounted(){
        store.setValidation(this.$v);
    },
    methods:{
        hasError(fieldName){
            return (fieldName in this.$v.formData) && (this.$v.formData[fieldName].$error)
        }
    },
}
</script>