<template>
  <v-container fluid >
    <h1 class="display-2 pa-3">Browse Property</h1>
    <v-layout pl-3 pr-3>
      <v-icon large class="pr-4">search</v-icon>
      <v-text-field label="Search by title or address" v-model="search" @keyup="updateSearch"></v-text-field>
    </v-layout>
    <v-container fluid>
      <v-layout wrap justify-center>
          <prop-card v-for="prop in allProps" :key="prop._id" :prop="prop"></prop-card>
      </v-layout>
    </v-container>
    
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import PropCard from './PropCard'
export default {
  data () {
    return {
    }
  },
  methods: {
    updateSearch () {
      this.$store.commit('getAllProps')
    }
  },
  components: {
    PropCard
  },
  computed: 
    mapGetters([
      'allProps'
    ]),
  computed : {
    search: {
      // get(){
      //   return this.$store.state.leftDrawer
      //   },
      set(value){ 
        this.$store.state.searchField = value
        if (value && value !== null){
          this.$store.state.isSearch = true
        } else {
          this.$store.state.isSearch = false
        }
      },
    },
    allProps : {
      get() {
        return this.$store.state.allProps
      }
    }
  },
  created () {
    this.$store.commit('getAllProps')
  },
  
}
</script>