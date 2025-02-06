<template>
    <div class="menu">
      <h3>Choisir une couche</h3>
      <select v-model="selectedLayer" @change="updateStyles">
        <option v-for="layer in layers" :key="layer.name" :value="layer.name">
          {{ layer.title }}
        </option>
      </select>
  
      <h3>Choisir un style</h3>
      <select v-if="styles.length > 0" v-model="selectedStyle" @change="emitLayerChange">
        <option v-for="style in styles" :key="style.name" :value="style.name">
          {{ style.title }}
        </option>
      </select>
    </div>
  </template>
  
  <style scoped>
  .menu {
    position: absolute;
    top: 90px;  /* ✅ Descend le menu pour éviter les boutons de zoom */
    left: 10px;
    background: rgba(255, 255, 255, 0.7);
    padding: 15px;
    border-radius: 12px;
    z-index: 1000;
    width: 280px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  h3 {
  font-weight: 600;
  color: #333;
}

/* Sélecteurs plus jolis */
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  transition: all 0.3s ease;
}

select:hover {
  background-color: #c1e1c5;
}

option {
  padding: 10px;
}
  </style>
  
  
  <script>
  export default {
    data() {
      return {
        selectedLayer: "", // couche sélectionnée
        selectedStyle: "", // style sélectionné
        layers: [], // Liste des couches récupérées
        styles: [], // Liste des styles pour chaque couche
        wmsUrl: "https://www.geotests.net/geoserver/ballot/wms",
      };
    },
    mounted() {
      this.fetchCapabilities();
    },
    methods: {
      fetchCapabilities() {
        fetch(`${this.wmsUrl}?service=WMS&request=GetCapabilities&version=1.1.1`)
          .then(response => response.text())
          .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            const layers = xmlDoc.getElementsByTagName("Layer");

            let layerList = [];
            for (let i = 1; i < layers.length; i++) {
              let name = layers[i].getElementsByTagName("Name")[0]?.textContent;
              let title = layers[i].getElementsByTagName("Title")[0]?.textContent;
              let styles = [];

              let styleElements = layers[i].getElementsByTagName("Style");
              for (let j = 0; j < styleElements.length; j++) {
                let styleName = styleElements[j].getElementsByTagName("Name")[0]?.textContent;
                let styleTitle = styleElements[j].getElementsByTagName("Title")[0]?.textContent;
                styles.push({ name: styleName, title: styleTitle });
              }

              if (name) {
                layerList.push({ name, title, styles });
              }
            }

            this.layers = layerList;
            this.selectedLayer = this.layers[0].name;
            this.updateStyles();
          });
      },
      updateStyles() {
        let selected = this.layers.find(l => l.name === this.selectedLayer);
        this.styles = selected ? selected.styles : [];
        this.selectedStyle = this.styles.length > 0 ? this.styles[0].name : "";
        this.emitLayerChange();
      },
      emitLayerChange() {
        this.$emit("layer-change", this.selectedLayer, this.selectedStyle);
      },
    },
  };
  </script>
  
  
  