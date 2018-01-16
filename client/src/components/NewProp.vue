<template>
  <v-container pa-5>
    <h1>Add New Advertisement</h1>
      <v-form v-model="valid">
        <v-layout align-center>
          <v-subheader>Title: </v-subheader>
          <v-text-field label="enter title here" required v-model="caption"></v-text-field>
        </v-layout>
        <v-layout align-center >
          <v-subheader>Price: </v-subheader>
          <v-text-field label="enter price here" required v-model="price"></v-text-field>
        </v-layout>
        <v-layout row align-center>
          <v-subheader>Type:</v-subheader>
          <v-select
            v-bind:items="propTypes"
            v-model="propType"
            label="Select Type"
            single-line
          ></v-select>
        </v-layout>
        <v-layout row align-center>
          <v-subheader>Status:</v-subheader>
          <v-select
            v-bind:items="propStatuses"
            v-model="propStatus"
            label="Select Status"
            single-line
          ></v-select>
        </v-layout>
          <div> <v-subheader> Location: </v-subheader><br/> 
            Latitude: {{this.$store.state.newPropLat}} <br/> 
            Longitude: {{this.$store.state.newPropLng}} 
          </div>
          <google-map
            name="example"
          ></google-map>
        <v-layout align-center pt-4>
          <v-subheader>Address:  </v-subheader>
          <v-text-field label="Enter address" required v-model="address" multi-line></v-text-field>
        </v-layout>
          <v-layout align-center >
            <v-subheader> Land Area: </v-subheader>
            <v-text-field label="Building Area (sqm)" v-model="buildingArea"></v-text-field>
          </v-layout>
          <v-layout align-center>
            <v-subheader> Building Area: </v-subheader>
            <v-text-field label="Land Area (sqm)" v-model="landArea"></v-text-field>
          </v-layout>

        <v-layout row align-center>
          <v-subheader>Number of Bedrooms: </v-subheader>
          <v-select
            v-bind:items="bedrooms"
            v-model="bedroomCount"
            label="Select"
            single-line
          ></v-select>
        </v-layout>
        
        <v-layout row align-center>
          <v-subheader>Number of Bathrooms: </v-subheader>
          <v-select
            v-bind:items="bathrooms"
            v-model="bathroomCount"
            label="Select"
            single-line
            bottom
          ></v-select>
        </v-layout>

        <v-layout row align-center>
          <v-subheader>Images: </v-subheader>
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
        type          : this.propType,
        status        : this.propStatus,
        location : {
          lat: this.$store.state.newPropLat,
          lng: this.$store.state.newPropLng 
        },
      }

      const formData = new FormData()
      let strNewProp = JSON.stringify(newProp)
      for (let i = 0; i<this.uploadFiles.length; i++){
        formData.append('files', this.uploadFiles[i])
      }
      formData.append('detailProp', strNewProp)
      this.$axios
      .post('/props', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': localStorage.getItem('token')
        }
      })
      .then(response =>{
        let newPropId = response.data.data._id
        this.$router.push(`/detail/${newPropId}`)
      })
      .catch(err => console.log(`Fail: ${err}`))
    }
  }
}
</script>
