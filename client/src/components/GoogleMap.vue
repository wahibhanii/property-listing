<template>
  <v-layout>
  <div class="google-map" :id="mapName"></div>
  </v-layout>
</template>

<script>
export default {
  name: 'google-map',
  props: ['name','centerLoc'],
  data: function () {
    return {
      mapName: this.name + "-map",
    }
  },
  mounted () {
    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 11,
      center: new google.maps.LatLng(-6.175371641294809 ,106.82693481445312)
    }
    const map = new google.maps.Map(element, options);
    google.maps.event.addListener(map, 'click', (event) => {
      placeMarker(map, event.latLng);
    });

    let placeMarker= (map, location) => {
      if (this.$store.state.newPropMarker) {
        this.$store.state.newPropMarker.setPosition(location);
      } else {
        this.$store.state.newPropMarker = new google.maps.Marker({
        position: location,
        map: map,
        });
      }
      this.$store.state.newPropInfoWindow= new google.maps.InfoWindow({
        content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
      });
      this.$store.state.newPropInfoWindow.open(map,this.$store.state.newPropMarker);
      this.$store.state.newPropLat = location.lat()
      this.$store.state.newPropLng = location.lng()
   }
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