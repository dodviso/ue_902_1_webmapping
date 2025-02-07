<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { nextTick } from "vue";

export default {
  data() {
    return {
      map: null,
      wmsLayer: null,
      wmsUrl: "https://www.geotests.net/geoserver/ballot/wms",
      selectedLayer: "", // L'initialisation doit être vide
      basemaps: {
        osm: {
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          name: "OpenStreetMap",
        },
        satellite: {
          url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
          name: "Satellite",
        },
        terrain: {
          url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", // Remplacer par le lien approprié
          name: "Terrain",
        },
      },
      layersControl: null,  // Control pour les couches
    };
  },
  mounted() {
    nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([43.6, 1.42], 10);

      // Ajouter les fonds de carte par défaut
      const osmLayer = L.tileLayer(this.basemaps.osm.url, {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      const satelliteLayer = L.tileLayer(this.basemaps.satellite.url, {
        attribution: '&copy; Google',
      });

      const terrainLayer = L.tileLayer(this.basemaps.terrain.url, {
        attribution: '&copy; OpenTopoMap contributors',
      });

      this.map.attributionControl.addAttribution('Données IGN 2016, Sentinel-2 2022'); 

      // Ajouter le contrôle des couches (Layer Control)
      this.layersControl = L.control.layers(
        {
          [this.basemaps.osm.name]: osmLayer,
          [this.basemaps.satellite.name]: satelliteLayer,
          [this.basemaps.terrain.name]: terrainLayer,
        },
        {},
        { collapsed: true }
      ).addTo(this.map);

      // Ne pas initialiser la couche WMS ici, on la met à jour via updateLayer
    },

    updateLayer(layer, style) {
      this.selectedLayer = layer; // Mettre à jour le nom de la couche
      if (this.wmsLayer) {
        this.map.removeLayer(this.wmsLayer);
      }
      this.wmsLayer = L.tileLayer.wms(this.wmsUrl, {
        layers: this.selectedLayer,  // Utilise la couche sélectionnée
        styles: style,
        format: "image/png",
        transparent: true,
        version: "1.1.1",
      }).addTo(this.map);
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}

#map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}
</style>
