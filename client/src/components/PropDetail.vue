<template>
  <v-container>
    <v-layout row justify-center>
      <h1 class="display-2 pt-2 pb-2">{{propData.caption}}</h1>
    </v-layout>
    <v-layout row class="pt-2 pb-5">
      <v-carousel>
        <v-carousel-item v-for="(image, i) in propData.images" :src="image" :key="i" ></v-carousel-item>
      </v-carousel>
    </v-layout>

    <v-layout row justify-center>
      <h1 class="display-1 pt-3 pb-3">{{rupiahify(propData.price)}}</h1>
    </v-layout>
    
    <v-container class="subheading">
      <v-layout>
        <v-flex class="pt-3 pb-3">
          <span >Address :</span>
          <span >{{propData.address}}</span>
        </v-flex>
      </v-layout>
      <v-divider/>
      <v-layout>
        <v-flex class="pt-3 pb-3">
          <span >Owner :</span><br/>
          <span class="pl-3">Name: {{propData.owner.userName}}</span><br/>
          <span class="pl-3">Email: {{propData.owner.email}}</span><br/>
          <span class="pl-3">Phone Number: {{propData.owner.phone}}</span>
        </v-flex>
      </v-layout>
      <v-divider/>
      <v-layout wrap class="pt-3 pb-3">
        <v-flex >
          <span >Type :</span>
          <span >{{propData.type}}</span>
        </v-flex>
        <v-flex >
          <span >Status :</span>
          <span >{{propData.status}}</span>
        </v-flex>
      </v-layout>
      <v-divider/>
      <v-layout wrap class="pt-3 pb-3">
        <v-flex >
          <span >Building Area :</span>
          <span >{{propData.buildingArea}} m&sup2;</span>
        </v-flex>
        <v-flex>
          <span >Land Area :</span>
          <span >{{propData.landArea}} m&sup2;</span>
        </v-flex>
      </v-layout>
      <v-divider/>
      <v-layout wrap class="pt-3 pb-3">
        <v-flex >
          <span >Bedrooms :</span>
          <span >{{propData.bedroomCount}} ea;</span>
        </v-flex>
        <v-flex>
          <span >Bathrooms :</span>
          <span >{{propData.bathroomCount}} ea</span>
        </v-flex>
      </v-layout>
      <v-divider/>
      <v-layout wrap class="pt-3 pb-3">
        <v-flex >
          <span >Location :</span>
        </v-flex>
        <v-flex class="pb-3" >
          <span >Latitude: {{propData.location.lat}},</span><br/> 
          <span>Longitude: {{propData.location.lng}} </span>
        </v-flex>
        
      </v-layout>

      <v-layout row >
        <location-map :location="propData.location" name="propLocation"></location-map>
      </v-layout>
      <v-divider class="mt-4 mb-4 "/>
      <v-layout row justify-center class="mb-3" v-if="isUserAuth">
        <v-btn color="indigo" dark @click="gotoEditProp()">
          <v-icon>edit</v-icon>
          Edit Ads
        </v-btn>
      </v-layout>
      <v-layout row justify-center v-if="isUserAuth">
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-btn color="red" flat slot="activator"> <v-icon>delete</v-icon>Delete Ads</v-btn>
          <v-card>
            <v-card-title class="headline">Delete this Ads?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="dialog = false">Cancel</v-btn>
              <v-btn color="red darken-1" flat @click.native="deleteProp">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      
    
    </v-container>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import PropCard from './PropCard'
import LocationMap from './LocationMap'
import jwt from 'jsonwebtoken'
export default {
  data () {
    return {
      propData: {
        owner: {
          userName:'',
          email: '',
          phone: '',
        },
        type: '',
        status: '',
        caption: '',
        buildingArea: 0,
        landArea: 0,
        price: 0,
        location: {
          lat: 0,
          lng: 0,
        }
      },
      dialog: false,
    }
  },
  components: {
    LocationMap,
  },
  methods: {
    rupiahify (price) {
      return `Rp${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},00`
    },
    gotoEditProp(){
      this.$router.push(`/edit/${this.propData._id}`)
    },
    deleteProp () {
      let propId = this.$route.params.id
      this.$axios({
        method: 'delete',
        url: `/props/${propId}`,
        headers: {token: localStorage.token}
      })
      .then(response => {
        this.$router.push('/browse')
      })
      .catch(err => {
      })
    }
  },
  computed : {
    isUserAuth () {
      let userId = jwt.decode(localStorage.token)._id
      return (userId === this.propData.owner._id)
    },

  },
  beforeCreate () {
    let propId = this.$route.params.id
    this.$axios({
      method: 'get',
      url: `/props/${propId}`,
      headers: {token: localStorage.token}
    })
    .then(response => {
      this.propData = response.data.data
    })
    .catch(err => {
    })
  },
}
</script>