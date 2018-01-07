<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import store from './vuex/index'
export default {
  name: 'app',
  store,
  data () {
    return {

    }
  },
  created () {
    this.$store.commit('setLoginStatus')
    console.log(this.$store.state.isLoggedIn)
  }
}
</script>

