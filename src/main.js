import { createApp } from 'vue'
import mapboxgl from 'mapbox-gl'
// import L from 'leaflet'
// import '@geoman-io/leaflet-geoman-free'
// import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import App from './App.vue'

window.mapboxgl = require('mapbox-gl');

createApp(App).mount('#app')
