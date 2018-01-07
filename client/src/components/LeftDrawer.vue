<template>
  <v-navigation-drawer 
    fixed light 
    v-model="leftDrawer" 
    :clipped="true"
    app>
    <v-list  class="pt-0">
      <v-list-tile @click="gotoHome">
        <v-list-tile-action>
          <v-icon>home </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="gotoNewProp" >
        <v-list-tile-action >
          <v-icon>add</v-icon>
        </v-list-tile-action>
        <v-list-tile-content >
          <v-list-tile-title>Post new Advertisement!</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="gotoBrowse" >
        <v-list-tile-action >
          <v-icon>search</v-icon>
        </v-list-tile-action>
        <v-list-tile-content >
          <v-list-tile-title>Browse Property</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    gotoNewProp () {
      this.$router.push('/newprop')
    },
    gotoHome () {
      this.$router.push('/home')
    },
    gotoBrowse () {
      this.$router.push('/browse')
    }
  },
  computed : {
    leftDrawer: {
      get(){
        return this.$store.state.leftDrawer
        },
      set(value){ 
        this.$store.state.leftDrawer = value},
    }
  },
  updated (){
  }
  
}
</script>
