<template>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</head>
  <div class="app-container">
    <!-- ✅ Titre au centre -->
    <h1 class="map-title">Essences d'arbres en Haute-Garonne</h1>

    <MapView ref="mapView" />
    <LayerSelector @layer-change="updateMapLayer" />
    <Legend :legendUrl="legendUrl" />

    <!-- ✅ Ajout du volet Info -->
    <Info />
  </div>
</template>

<script>
import MapView from "./components/MapView.vue";
import LayerSelector from "./components/LayerSelector.vue";
import Legend from "./components/Legend.vue";
import Info from "./components/Info.vue"; // ✅ Ajout du volet rétractable

export default {
  components: {
    MapView,
    LayerSelector,
    Legend,
    Info,
  },
  data() {
    return {
      legendUrl: "",
    };
  },
  methods: {
    updateMapLayer(layer, style) {
      if (this.$refs.mapView && typeof this.$refs.mapView.updateLayer === "function") {
        this.$refs.mapView.updateLayer(layer, style);
      } else {
        console.error("Erreur : updateLayer n'est pas défini dans MapView.vue");
      }

      // ✅ Met à jour dynamiquement l'URL de la légende
      this.legendUrl = `https://www.geotests.net/geoserver/ballot/wms?request=GetLegendGraphic&version=1.1.1&format=image/png&layer=${layer}&style=${style}`;
    },
    preventScroll(event) {
      event.preventDefault(); // ✅ Bloque le scroll au niveau des événements
    },
  },
  mounted() {
    // ✅ Supprime toute marge et padding via JavaScript
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";

    // ✅ Désactive aussi tout scroll qui pourrait venir du navigateur
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // ✅ Vérifie et supprime toute autre marge par défaut
    if (window.getComputedStyle(document.body).margin !== "0px") {
      document.body.style.margin = "0 !important";
    }
  },
  beforeUnmount() {
    window.removeEventListener("wheel", this.preventScroll);
    window.removeEventListener("touchmove", this.preventScroll);
  },
};
</script>

<style scoped>

h1 {
  font-weight: 600;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* ✅ Empêche le scroll */
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* Désactive le scroll */
  height: 100%;
}

/* ✅ Conteneur principal en flexbox */
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch; /* ✅ Évite l’espace en haut */
  justify-content: stretch; /* ✅ Évite l’espace sur les côtés */
  position: relative;
}

/* ✅ Titre centré */
.map-title {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.7);
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 1000;
  margin: 0;
}

html, body {
  display: flex !important; /* ✅ Évite les marges automatiques du navigateur */
  flex-direction: column;
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

</style>
