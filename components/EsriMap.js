import { loadModules } from "esri-loader";
import useSWR from "swr";

const LEGEND = [
  {
    color: "#36869a",
    threshold: 60,
    label: "> 60",
  },
  {
    color: "#4facc5",
    threshold: 50,
    label: "50 - 60",
  },
  {
    color: "#94cddb",
    threshold: 40,
    label: "40 - 50",
  },
  {
    color: "#b7dde7",
    threshold: 30,
    label: "30 - 40",
  },
  {
    color: "#dbeef6",
    threshold: 0,
    label: "< 30",
  },
  {
    color: "#d8d8d8",
    fallback: true,
    label: "Información no disponible",
  },
];

const getCountryFill = (score) => {
  if (score == null) return LEGEND.find((item) => item.fallback).color;

  return LEGEND.find((item) => score >= item.threshold).color;
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const EsriMap = () => {
  const { data } = useSWR(
    "https://services7.arcgis.com/IyvyFk20mB7Wpc95/arcgis/rest/services/SDR_2021_Dataset/FeatureServer/0/query?where=1%3D1&outFields=id,sdgi_s&outSR=4326&f=json",
    fetcher
  );

  console.log(data);

  if (!data) return null;

  const dataWithColor = data.features.map((feature) => ({
    value: feature.attributes.id,
    symbol: {
      type: "simple-fill",
      color: getCountryFill(feature.attributes.sdgi_s),
    },
  }));

  console.log(dataWithColor);

  loadModules([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
  ]).then(([esriConfig, Map, MapView, GeoJSONLayer]) => {
    esriConfig.apiKey =
      "AAPKc0cb25ac2df940c0ade85be55fe1e373-99W-W4hV6xFLTYdnG8yrSgJeaF9lBD7cBH7G0oEzUrLumbmdiSItDxPHLx755w7";

    const map = new Map({
      basemap: "streets-vector", // Basemap layer service
    });

    new MapView({
      map: map,
      center: [7.419778610764139, 48.250093856735575], // Longitude, latitude
      zoom: 3, // Zoom level
      container: "viewDiv", // Div element
    });

    const colorRenderer = {
      type: "unique-value",
      defaultSymbol: {
        color: "green",
        type: "simple-fill",
        style: "solid",
        outline: {
          color: "white",
          width: 1,
        },
      },
      field: "iso_a3",
      uniqueValueInfos: dataWithColor,
    };

    // const popup = {
    //   title: "POPUP",
    //   content: "<h1>THIS IS A POPUP</h1>",
    // };

    // create new geojson layer using the blob url
    const layer = new GeoJSONLayer({
      url: "/static/world.json",
      outFields: ["*"],
      renderer: colorRenderer,
      opacity: 0.7,
    });

    map.add(layer);
  });

  return (
    <div
      style={{ padding: 0, margin: 0, height: "100vh", width: "100vw" }}
      id="viewDiv"
    ></div>
  );
};

export default EsriMap;
