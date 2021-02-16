import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    successed: null,
    wizardForm: {
      job : null,
      companyName : null,
      interested: null,
      benefit : null,
      firstName: null, 
      lastName: null, 
      emailAddress: null, 
      phoneNumber: null,
      preferLang: null,
      country: null, 
      state: null, 
      address1: null, 
      address2: null,
      city: null,
      zipCode: null,
      message : null,
      reCaptcha : null,
      receive : null
    },
    isNextable : false,
    currentTab: 0,
    failedCount : 0,
  },
  getters : {
    getSuccessed: state => state.successed,
    getFailedCount: state => state.failedCount,
    getIsNextable : state => state.isNextable,
    getWizardForm : state => state.wizardForm
  },
  mutations: {
    //set current Step
    setWizardForm (state, payload) {
      state.wizardForm = Object.assign(payload.formData);
    },
    setIsNextable (state, payload){
      state.isNextable = payload.nextable
    },
    setSuccessed (state, payload) {
      state.successed = payload.successed
    },
    setFailedCount (state, payload){
      state.failedCount = payload.failedCount
    },
  },
  actions: {
    //actions of setting current Step
    setIsNextable (context, payload) {
      context.commit('setIsNextable', payload)
    },
    setSuccessed(context, payload){
      context.commit('setSuccessed', payload)
    },
    setFailedCount(context, payload){
      context.commit('setFailedCount', payload)
    },
    setWizardForm (context, payload) {
      context.commit('setWizardForm', payload)
    },
    sendAllData(context, payload) {
      //send to the backend api and get the repsonse
      let response = 201
      console.log('---')
      console.log(this.state.wizardForm);
      if(response != 200) {
        context.commit('setFailedCount', {failedCount : this.state.failedCount + 1})
        return 'failed'
      } else {
        context.commit('setSuccessed', {successed : 'success'})
        return 'success'
      }
    }
  }
})
export default store;