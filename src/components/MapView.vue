<template>
  <div class="map-container">
    <!-- Sélecteur de fond de carte -->
    <div class="basemap-selector">
      <h3>Choisir le fond de carte</h3>
      <select v-model="selectedBasemap" @change="changeBasemap">
        <option value="osm">OpenStreetMap</option>
        <option value="satellite">Satellite</option>
        <option value="terrain">Terrain</option>
      </select>
    </div>
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
      highlightLayer: null,
      wmsUrl: "https://www.geotests.net/geoserver/ballot/wms",
      selectedLayer: "", // L'initialisation doit être vide
      selectedBasemap: "osm",  // Fond de carte par défaut
      basemaps: {
        osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        satellite: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",  // Remplacer par le lien approprié
      },
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

      // Ajouter le fond de carte par défaut
      this.addBasemap();

      // Ne pas initialiser la couche wms ici, on la met à jour via updateLayer
    },

    // Ajouter le fond de carte en fonction de la sélection
    addBasemap() {
      const basemapUrl = this.basemaps[this.selectedBasemap];
      L.tileLayer(basemapUrl, {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);
    },

    // Méthode pour changer dynamiquement le fond de carte
    changeBasemap() {
      // Supprimer tous les layers existants (y compris le fond de carte actuel)
      this.map.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
          this.map.removeLayer(layer);
        }
      });

      // Ajouter le fond de carte sélectionné
      this.addBasemap();
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

.basemap-selector {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.basemap-selector select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  width: 200px;
  transition: all 0.3s ease;
}

select:hover {
  background-color: #c1e1c5;
}
</style>
