<template>
    <div id='map'>
      <p>Enter access token:</p>
      <input id='mapToken' type="text" v-model="map_arguments.accessToken"><button @click='updateMap'>load map</button>
      <div id="mapid" v-bind:style="mapid"></div>
    </div>
</template>

<script>
export default {
  name: 'Map',
  data() {
      return {
        tile: null,
        map: null,
        mapid: {
          height: '750px',
          width: '750px'
        },
        map_arguments: {
          // zoom: 18,
          // id: 'mapbox/satellite-v9',
          // tileSize: 512,
          // zoomOffset: -1,
          accessToken: '',
          // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          
        }
      }
    },
    mounted() {

    },
    computed() {

    },
    
    updated() {
    },
    
    methods: {
      updateMap: function() {
        if (this.map === null) {
          mapboxgl.accessToken = this.map_arguments.accessToken; /* global mapboxgl */
          this.map = new mapboxgl.Map({
              container: 'mapid',
              style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
              center: [-93.79956230521202, 41.71010074072029], // starting position [lng, lat]
              zoom: 15 // starting zoom
          });
        } else {
          mapboxgl.accessToken = this.map_arguments.accessToken;
        }
      }
    }
}
</script>
<style scoped>
  #map {
    height: 100%;
    width: 100%;
  }
  #mapToken {
    margin-bottom: 20px;
    margin-right: 10px;
  }
</style>