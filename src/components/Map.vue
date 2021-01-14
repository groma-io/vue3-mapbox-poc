<template>
    <div id='map'>
      <div id="mapid" v-bind:style="mapid"></div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Map',
  data() {
      return {
        tile: null,
        map: null,
        mapid: {
          height: '100vh',
          width: '100vw'
        },
        landview_arguments: {
          base_url: 'https://tiles.makeloveland.com',
          url: '/api/v1/parcels?format=mvt&token=',
          accessToken: process.env.VUE_APP_LANDVIEWTOKEN,
          
          
        },
        landview_layer_data: [],
        mapbox_arguments: {
          // id: 'mapbox/satellite-v9',
          // tileSize: 512,
          // zoomOffset: -1,
          zoom: 15,
          html_container: 'mapid',
          style: 'mapbox://styles/mapbox/outdoors-v11',
          accessToken: process.env.VUE_APP_MAPBOXTOKEN,
          center: [-93.79956230521202, 41.71010074072029]
          // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          
        }
      }
    },
    mounted() {
      mapboxgl.accessToken =  this.mapbox_arguments.accessToken /* global mapboxgl */
      this.map = new mapboxgl.Map({
          container: this.mapbox_arguments.html_container,
          style: this.mapbox_arguments.style, // stylesheet location
          center: this.mapbox_arguments.center, // starting position [lng, lat]
          zoom: this.mapbox_arguments.zoom // starting zoom
      });
      // this.map.showTileBoundaries = true;
    },
    computed() {

    },
    
    created() {
      let url = this.landview_arguments.base_url + this.landview_arguments.url + this.landview_arguments.accessToken;
      axios.get(url)
      .then(response => {
        this.landview_layer_data = response.data;
        this.map.addSource(this.landview_layer_data.id, {
            type: 'vector',
            tiles: this.landview_layer_data.tiles
          });
          
        this.map.addLayer({
          'id': 'parcels',
          'type': 'line',
          'source': this.landview_layer_data.id,
          'source-layer': this.landview_layer_data.id,
          'minzoom': 13,
          'maxzoom': 20,
          layout: {
            visibility: 'visible'
          },
          'paint': {
            'line-color': '#649d8d'
          }
        });          
      })
      .catch(e => {
        console.log(e);
      })
    },

      // this.map.addSource('mapbox-dem', {
      //   'type': 'raster-dem',
      //   'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      //   'tileSize': 512,
      //     'maxzoom': 14,
      //     'center': [0, 0]
      // });
      
      //           // add the DEM source as a terrain layer with exaggerated height
      // this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
           
      //     // add a sky layer that will show when the map is highly pitched
      // this.map.addLayer({
      //   'id': 'sky',
      //   'type': 'sky',
      //   'paint': {
      //   'sky-type': 'atmosphere',
      //   'sky-atmosphere-sun': [0.0, 0.0],
      //   'sky-atmosphere-sun-intensity': 15
      //   }
      // })

    methods: {
      updateMap: function() {
      }
    }
}
</script>
<style scoped>
</style>