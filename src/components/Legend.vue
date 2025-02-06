<template>
    <div v-if="legendUrl" class="legend">
      <img :src="legendUrl" alt="Légende WMS" />
    </div>
  </template>
  
  <style scoped>
  .legend {
    position: absolute;
    bottom: 30px;
    right: 10px;
    background: rgba(255, 255, 255, 0.7); /* Fond léger */
    padding: 15px;
    border-radius: 12px;
    z-index: 1000;
    max-width: 300px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Ombre */
  }
  
  .legend img {
    max-width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }
  </style>
  
  
  <script>
  export default {
    props: ["legendUrl"],
  };
  </script>
