export const store = {
    state: {
      currentTab: 0,
      v: {},
      formData:{
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
        message : '',
        reCaptcha : null,
        receive : null,
        
        // fullName: '',
        // email: null,
        // companyName: null,
        // numberOfEmployees: null,
        // referral: null,
        // terms: false,
      },
    },
    setCurrentTab (newValue) {
        this.state.currentTab = newValue;
    },
    setValidation(newValue){
      this.state.v = newValue;
    }
  };