_Doris Ballot M2 SIGMA 2024-2025_  

# UE 902_1 : Webmapping

**Laurent Jégou**  
**Nicolas Lagarrigue**

## Paramétrage des webservices

J'ai choisi trois couches à diffuser en flux WMS pour ma carte interactive :  

- Valeurs de NDVI par pixels (raster)
- Classification des pixels en essences forestières (raster)
- Polygones de BD Forêt utilisées pour la classification (vecteur)

Sur GeoServer, j'ai créé trois entrepôts, un pour chaque couche. Ensuite, j'ai créé deux styles pour chaque raster et un style pour la couche vectorielle, en utilisant QGIS pour produire la symbologie que j'ai ensuite exportée au format SLD. J'ai aussi ajouté les légendes associées aux styles.

L'utilité d'avoir plusieurs styles pour les rasters est surtout de permettre un changement dynamique du style dans la carte, via le sélecteur.

Une fois les styles créés et associés aux couches, elles sont prêtes à être utilisées via un flux WMS.

## Création de la webmap

Pour créer la carte, j'ai utilisé **Vue.js**, un framework JavaScript pour structurer l'application sous forme de composants. Vue.js permet de développer des interfaces modulaires, ce qui a facilité la gestion des différentes parties de la carte. Ce n'était pas indispensable pour un projet de cette taille, mais cela m'a permis d'expérimenter avec cet outil, en prévision de projets plus complexes.

L'intégration des données se fait via des requêtes WMS, avec l'utilisation de **Leaflet** pour la gestion de la carte. J'ai utilisé les requêtes `GetCapabilities` pour récupérer les informations sur les couches, comme leurs styles et légendes, et je les affiche dynamiquement dans la carte.

- **Sélecteur de couches** : Le sélecteur permet de basculer entre les différentes couches (NDVI, classification des essences, BD Forêt) et de changer les styles dynamiquement.
- **Légende** : La légende est liée aux styles définis pour chaque couche, et elle est affichée dynamiquement en fonction du style sélectionné.

La page propose d'autres fonctionnalités; le sélecteur de fond de plan qui est une fonctionnalité intégrée à Leaflet, ainsi qu'un volet rétractable sur la droite pour accéder aux explications liées à la donnée cartographiée.

## Limites et pistes pour aller plus loin

Je n'ai pas réussi à utiliser un `GetFeatureInfo` pour interroger les couches, malgré l'activation de l'option `queryable` dans GeoServer. Même dans la prévisualisation sur GeoServer, mes couches n'étaient pas interrogeables. Je n'ai pas réussi à comprendre pourquoi, mon hypothèse étant que je sers des données vectorielles en flux WMS, et que donc la requête `GetFeatureInfo` ne fonctionnerait pas correctement. Toutefois, cela ne fonctionne pas non plus sur les couches raster, ce qui voudrait dire que la seule présence d'une couche vectorielle compromettrait la récupération des `features`pour toutes les couches du flux, ce qui serait étonnant.
Pour aller plus loin, il aurait pu être intéressant de tester avec un flux WFS pour voir si mes problèmes d'interrogation de couche auraient pu être résolus. 

