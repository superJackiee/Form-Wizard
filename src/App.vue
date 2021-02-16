<template>
  <div class="container py-5" id="app">
    <button @click="showModal=true" class="uk-button uk-button-primary">Contact Form</button>
    <WizardStepper 
      v-if="showModal"
      @close="showModal=false"
    ></WizardStepper>
  </div>
</template>

<script>
import WizardStepper from './demos/WizardStepper.vue'

export default {
  name: 'app',
  components: {
    WizardStepper
  },
  data () {
    return {
      showModal : false
    }
  }
}
</script>

<style lang="scss">
button {
  text-transform: none;
    display: inline-block;
    box-sizing: border-box;
    padding: 0 12px;
    background-color: #00a8e6;
    color: #fff;
    vertical-align: middle;
    line-height: 28px;
    min-height: 30px;
    font-size: 1rem;
    text-decoration: none;
    text-align: center;
    border: 1px solid rgba(0,0,0,.06);
    border-radius: 4px;
}
</style>
