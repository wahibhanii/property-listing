<template>
  <v-toolbar fixed :clipped-left="true" dark color="indigo" app>
    <v-toolbar-side-icon @click="drawerAction"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text" > 
      <v-icon>domain</v-icon>
      <span class="white--text hidden-xs-only">Property Listing</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat  @click="openLogin" v-if="!isLoggedIn">
      <v-icon>fingerprint</v-icon> 
      <span >Login</span>
    </v-btn>
    <v-menu left>
      <v-btn flat icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile>
          <v-list-tile-title v-if="isLoggedIn">Hello, {{userName}}</v-list-tile-title>
          <v-list-tile-title v-else>Hello, Guest</v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile  v-if="isLoggedIn">
            <v-btn outline @click="logout">
              <v-icon >exit_to_app</v-icon>
              Logout
            </v-btn>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  data () {
    return {
    }
  },
  methods : {
    drawerAction () {
      this.$store.state.leftDrawer = true
    },
    openLogin () {
      this.$store.state.loginDialog = true
    },
    logout () {
      localStorage.removeItem('token');
      this.$store.state.isLoggedIn = false;
    }
  },
    computed: {
      userName () {
        return jwt.decode(localStorage.token).userName
      },
      isLoggedIn: {
        get () {
          return this.$store.state.isLoggedIn
        }
      }
    }
}
</script>
