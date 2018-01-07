<template>
  <v-layout>
  <div class="google-map" :id="mapName"></div>
  </v-layout>
</template>

<script>
export default {
  name: 'google-map',
  props: ['name','location'],
  data: function () {
    return {
      mapName: this.name + "-map",
    }
  },
  mounted () {
    console.log(this,'-------------')
    let propCenter = new google.maps.LatLng(this.location.lat,this.location.lng)
    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 14,
      center: propCenter
    }
    const map = new google.maps.Map(element, options);
    let marker =  new google.maps.Marker({position: propCenter});
    marker.setMap(map)
    

    
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  padding-bottom: 80%;
  margin: 0 auto;
  background: gray;
}
</style>