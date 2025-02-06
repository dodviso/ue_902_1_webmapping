<template>
  <head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</head>

  <div :class="['side-panel', { open: isOpen }]">
    <!-- ✅ Onglet latéral plus grand -->
    <div class="toggle-tab" @click="togglePanel">
      <span>Informations</span>
    </div>

    <!-- ✅ Contenu du volet -->
    <div class="panel-content">
      <h3>Informations</h3>
      <p>Cette carte interactive présente les résultats d'un travail d'images satellites et de données de BD Forêt de l'IGN.</p>
      <p>L'objectif était de se baser sur les classes d'arbres présentes dans les données de BD Forêt, fournies sous forme de polygones, pour classer chaque pixel de forêt des images Sentinel-2</p>
      <p>Pour ce faire, nous avons extrait les pixels uniquement sur ces zones de forêt, puis nous avons calculé le NDVI avec les bandes S2 appropriées.</p>
      <p>Vous pouvez accéder à la visualisation du NDVI via le sélecteur à gauche.</p>
      <p>Ensuite, avec le NDVI et les classes de forêt, nous avons entrainé un modèle pour lui permettre d'apprendre à reconnaître la classe d'arbre d'un pixel, selon les données disponibles.</p>
      <p>Vous pouvez visualiser le résultat de cette classification via le sélecteur.</p>
      <p>Vous pouvez également changer le rendu des couleurs si vous souhaitez un peu de changement dans votre vie.</p>
      <p>Ce travail sur les images Sentinel-2 a été réalisé en trinôme avec Joséphine Chotard et Audrey Barbiero.</p>
      <p1>Carte interractive réalisée dans le cadre de l'UE 902_1 : webmapping. Doris Ballot, M2 SIGMA 2024-2025</p1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false, // ✅ L'état du volet (ouvert/fermé)
    };
  },
  methods: {
    togglePanel() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
/* ✅ Volet rétractable */
.side-panel {
  position: fixed; /* ✅ Fixé à droite, il ne suit pas le scroll */
  top: 0;
  right: 0; /* ✅ Fermé au départ */
  width: 380px;
  height: 100vh;
  background: rgb(245, 255, 244);
  border-left: 2px solid #ccc;
  transition: transform 0.3s ease-in-out; /* ✅ Animation fluide */
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transform: translateX(100%); /* ✅ Cache totalement le volet */
  font-family: 'Poppins', sans-serif;
}

/* ✅ Lorsque le volet est ouvert */
.side-panel.open {
  transform: translateX(0); /* ✅ Réapparaît proprement */
}

/* ✅ Onglet latéral plus grand */
.toggle-tab {
  position: absolute;
  top: 10%; /* ✅ Placé plus haut */
  left: -50px; /* ✅ Dépasse plus */
  width: 50px; /* ✅ Plus large */
  height: 140px; /* ✅ Plus grand */
  background: #302f2fa5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-rl; /* ✅ Texte vertical */
  text-orientation: mixed;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px 0 0 10px;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2);
}

/* ✅ Contenu du volet */
.panel-content {
  padding: 20px;
  font-size: 14px;
  color: #333;
  overflow-y: auto; /* ✅ Permet le scroll interne si besoin */
  flex-grow: 1;
}

.panel-content h3 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

/* ✅ Ajout du texte <p1> en bas du volet */
p1 {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 12px;
  color: #777; /* ✅ Gris clair */
  font-weight: 300;
  text-align: left;
  margin: 0;
}
</style>
