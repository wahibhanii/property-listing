<template>
  <v-container>
    <h1>Browse Property</h1>
    {{this.$store.state.searchField}} {{this.$store.state.isSearch}}
    <v-flex>
      <v-text-field label="Search" required v-model="search" @keyup="updateSearch"></v-text-field>
    </v-flex>
    <v-container wrap>
      <v-layout v-for="prop in allProps" :key="prop._id" >
        <prop-card :prop="prop" ></prop-card>
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