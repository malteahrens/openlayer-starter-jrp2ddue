import './style.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import WebGLTileLayer from 'ol/layer/WebGLTile'; // Use WebGLTile for GeoTIFF
import GeoTIFFSource from 'ol/source/GeoTIFF';

// 1. Define the OSM background
const osmLayer = new TileLayer({
  source: new OSM(),
});

// 2. Define the GeoTIFF source
const source = new GeoTIFFSource({
  sources: [
    {
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/2020/S2A_36QWD_20200701_0_L2A/TCI.tif',
    },
  ],
});

// 3. Use WebGLTileLayer instead of TileLayer
const tiffLayer = new WebGLTileLayer({
  source: source,
});

const map = new Map({
  layers: [osmLayer, tiffLayer],
  target: 'map',
  view: new View({
    // Optional: source.getView() returns a promise for a view
    // that fits the GeoTIFF perfectly.
    center: [3500000, 1500000], // Approximate location for the URL provided
    zoom: 6,
  }),
});

// Automatically center the map on the GeoTIFF once metadata is loaded
source.getView().then((viewConfig) => {
  map.getView().setProperties(viewConfig);
});
