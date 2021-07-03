<template>
  <div id="app">
    <Certificates/>
  </div>
</template>

<script>
import Certificates from './components/Certificates.vue'

export default {
  name: 'App',
  components: {
    Certificates
  }
}
</script>

<style>
  body {
    padding-top: 20px;
  }
  .textarea {
    font-family: Courier;
    font-size: 13px;
  }
</style>
