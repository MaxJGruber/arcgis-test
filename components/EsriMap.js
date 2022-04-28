import { loadModules } from "esri-loader";

const EsriMap = () => {
  loadModules([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
  ]).then(([esriConfig, Map, MapView, FeatureLayer]) => {
    esriConfig.apiKey =
      "AAPKc0cb25ac2df940c0ade85be55fe1e373-99W-W4hV6xFLTYdnG8yrSgJeaF9lBD7cBH7G0oEzUrLumbmdiSItDxPHLx755w7";

    const map = new Map({
      basemap: "streets-vector", // Basemap layer service
    });

    const view = new MapView({
      map: map,
      center: [7.419778610764139, 48.250093856735575], // Longitude, latitude
      zoom: 3, // Zoom level
      container: "viewDiv", // Div element
    });

    const popup = {
      title: "POPUP",
      content: "<h1>THIS IS A POPUP</h1>",
    };

    const layer = new FeatureLayer({
      url: "https://services7.arcgis.com/IyvyFk20mB7Wpc95/arcgis/rest/services/ESDR2021Database/FeatureServer/0",
    });

    const geojson = new FeatureLayer({
      url: "https://services7.arcgis.com/IyvyFk20mB7Wpc95/arcgis/rest/services/worldmap_geojson/FeatureServer/0",
      popupTemplate: popup,
    });
    map.add(layer);
    map.add(geojson);
  });

  return (
    <div
      style={{ padding: 0, margin: 0, height: "100vh", width: "100vw" }}
      id="viewDiv"
    ></div>
  );
};

export default EsriMap;
