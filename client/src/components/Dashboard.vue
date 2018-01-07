<template>
  <v-app>
   

   <left-drawer/>
   <top-nav/>
    <v-content>
      <router-view/>
    </v-content>
    <login/>
    <Sign-up/>
     

    <footter/>
  </v-app>
</template>

<script>
import TopNav from './TopNav'
import LeftDrawer from './LeftDrawer'
import Footter from './Footter.vue'
import Login from './login'
import SignUp from './SignUp'
export default {
  data () {
    return {
      drawer: true,
    }
  },
  components : {
    TopNav, LeftDrawer, Footter, Login, SignUp
  },
  methods : {
    drawerAction () {
      this.drawer = !this.drawer
    }
  }
}
</script>