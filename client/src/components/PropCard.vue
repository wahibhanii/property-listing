<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media :src="prop.images[0]" height="400px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{prop.caption}}</h3>
            <div>{{rupiahify(prop.price)}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="indigo" @click="gotoDetail(prop._id)">Detail</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
    }
  },
  props : ['prop'],
  methods: {
    rupiahify (price) {
      return `Rp${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},00`
    },
    gotoDetail(propId){
      console.log('gotoDetail...',propId)
      this.$router.push(`/detail/${propId}`)
    }
  },

  // updated () {
  //   this.$store.commit('getAllProps')
  // }
}
</script>