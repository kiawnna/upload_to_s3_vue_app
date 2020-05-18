<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import {AmplifyEventBus} from 'aws-amplify-vue';
export default {
  name: 'home',
  components: {
    Navbar
  },
  mounted() {
    const _this = this;
    AmplifyEventBus.$on('authState', info => {
      if (info == 'signedOut') {
        _this.$router.push('/')
      }
    });
  },
  data() {
    return {
      greeting: 'hi'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.hello button {
  margin: 10px !important;
}
</style>
