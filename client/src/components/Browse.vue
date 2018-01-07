<template>
  <v-container>
    <h1>Browse Property</h1>
    <prop-card v-for="prop in allProps" :key="prop._id" :prop="prop" ></prop-card>
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
  components: {
    PropCard
  },
  computed: 
    mapGetters([
      'allProps'
    ])
  ,
  created () {
    this.$store.commit('getAllProps')
  },
  // updated () {
  //   this.$store.commit('getAllProps')
  // }
}
</script>