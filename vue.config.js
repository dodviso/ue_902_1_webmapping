module.exports = {
    // Base URL pour le déploiement sur GitHub Pages
    publicPath: process.env.NODE_ENV === 'production'
      ? '/ue_902_1_webmapping/'
      : '/',
  
    // Autres options que tu pourrais configurer selon tes besoins
    outputDir: 'dist',  // Où les fichiers de production seront générés
    assetsDir: 'assets', // Dossier des ressources statiques
  
    // Pour désactiver l'erreur de `eslint` en production
    lintOnSave: process.env.NODE_ENV !== 'production',
  
    // Optionnel : configure l'utilisation d'un serveur local pour le développement
    devServer: {
      proxy: 'http://localhost:8080',
    },
  };
  