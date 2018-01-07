<template>
  <v-container>
    <h1>Add New Advertisement</h1>
      <v-form v-model="valid">
        <v-flex>
          <v-text-field label="Caption" required v-model="caption"></v-text-field>
        </v-flex>
        <v-flex >
          <v-text-field label="Price" required v-model="price"></v-text-field>
        </v-flex>
        <v-layout row align-center>
          <v-subheader>Type</v-subheader>
          <v-select
            v-bind:items="propTypes"
            v-model="propType"
            label="Select"
            single-line
          ></v-select>
        </v-layout>
        <v-layout row align-center>
          <v-subheader>Status</v-subheader>
          <v-select
            v-bind:items="propStatuses"
            v-model="propStatus"
            label="Select"
            single-line
          ></v-select>
        </v-layout>
        <v-container>
          <div> <v-subheader> Location: </v-subheader><br/> 
            Latitude: {{this.$store.state.newPropLat}} <br/> 
            Longitude: {{this.$store.state.newPropLng}} 
          </div>
          <google-map
            name="example"
          ></google-map>
          <v-flex >
            <v-text-field label="Address" required v-model="address" multi-line></v-text-field>
        </v-flex>
        </v-container>

        <v-layout row>
          <v-flex >
            <v-text-field label="Building Area (sqm)" v-model="buildingArea"></v-text-field>
          </v-flex>
          <v-flex >
            <v-text-field label="Land Area (sqm)" v-model="landArea"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row align-center>
          <v-subheader>Number of Bedrooms</v-subheader>
          <v-select
            v-bind:items="bedrooms"
            v-model="bedroomCount"
            label="Select"
            single-line
          ></v-select>
        </v-layout>
        
        <v-layout row align-center>
          <v-subheader>Number of Bathrooms</v-subheader>
          <v-select
            v-bind:items="bathrooms"
            v-model="bathroomCount"
            label="Select"
            single-line
            bottom
          ></v-select>
        </v-layout>

        <v-layout row align-center>
          <v-subheader>Images</v-subheader>
          <input type="file" ref="propImages" class="hide" accept="images/*" name="image" @change="uploadHandler" multiple>
        </v-layout>

        <v-layout row align-center justify-center>
          <v-btn color="indigo darken-1" dark @click.native="postAds">Post!</v-btn>
        </v-layout>
      </v-form>
  </v-container>

</template>

<script>
import GoogleMap from './GoogleMap'
export default {
  data () {
    return {
      valid: false,
      caption: null,
      price: null,
      address: null,
      buildingArea: null,
      landArea: null,
      bedroomCount: null,
      bedrooms: [0,1,2,3,4,5,6,7,8,9,10],
      bathroomCount: null,
      bathrooms: [0,1,2,3,4,5,6,7,8,9,10],
      propType: null,
      propTypes: ['apartment', 'house', 'land', 'office space', 'building', 'other'],
      uploadFiles: null,
      propStatus: null,
      propStatuses: ['for sale', 'lease']
    }
  },
  components: {
    GoogleMap
  },
  methods: {
    uploadHandler () {
      this.uploadFiles = this.$refs.propImages.files
    },
    postAds () {
      let newProp = {
        caption       : this.caption,
        price         : this.price,
        address       : this.address,
        buildingArea  : this.buildingArea,
        landArea      : this.landArea,
        bedroomCount  : this.bedroomCount,
        bathroomCount : this.bathroomCount,
        location : {
          lat: this.$store.state.newPropLat,
          lng: this.$store.state.newPropLng 
        },
      };
      console.log(newProp)

      const formData = new FormData()
      let strNewProp = JSON.stringify(newProp)
      formData.append('file', this.uploadFile)
      formData.append('detailProp', strNewProp)
      this.$axios
      .post('/props', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': localStorage.getItem('token')
        }
      })
      .then(response =>{
        console.log(response);
        alert('Shared...!')
      })
      .catch(err => console.log(`Fail: ${err}`))
    }
  }
}
</script>
