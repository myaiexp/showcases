// Leaflet 2: lightweight, mobile-friendly interactive maps (the 2.0 beta line)
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Leaflet 2',
  npm: 'leaflet',
  tagline: 'Lightweight, mobile-friendly interactive maps: tiles, markers, vectors and GeoJSON.',
  about:
    'Leaflet is the small, dependency-free map library behind a large share of the web’s slippy maps. 2.0 changes how you load and extend it: it ships as ES modules with classes in place of factory functions (new LeafletMap(el), new Marker(latlng)), handles every input with Pointer Events, draws the default marker as an inline SVG and ships its own TypeScript types. A map is a stack of panes holding layers: raster tiles and image overlays, SVG or Canvas vector paths, markers, popups and tooltips, plus controls in the corners. These examples follow the 2.0 tutorials and the API reference, which Leaflet generates from the JSDoc in its source. Every tile here comes from a pretend tile server in the page that paints Natural Earth land, so nothing is fetched.',
  category: 'Graphics',
  homepage: 'https://leafletjs.com/',
  docsUrl: 'https://leafletjs.com/reference.html',
  repo: 'https://github.com/Leaflet/Leaflet',
  added: '2026-11-15',
  // The tutorials' topics slotted into the API reference's group order (build/reference.json):
  // Map, Markers, UI layers, Raster layers, Vector layers, Other layers, Controls, Basic types,
  // Coordinate systems, Utility, Base classes (extending).
  sections: [
    'Quick start',
    'Map view',
    'Map interaction',
    'Map events & conversion',
    'Zoom levels',
    'Map panes',
    'Markers & icons',
    'Popups & tooltips',
    'Tile layers',
    'WMS & TMS',
    'Image, video & SVG overlays',
    'Vector layers',
    'Renderers',
    'Layer groups',
    'GeoJSON',
    'Choropleth',
    'Controls',
    'Geometry & types',
    'Coordinate systems',
    'Utilities & DOM',
    'Extending Leaflet',
    'Accessibility & mobile',
  ],
  credit: {
    text: 'Volodymyr Agafonkin and CloudMade: Leaflet documentation, tutorials and tutorial images',
    url: 'https://github.com/Leaflet/Leaflet',
    license: 'BSD 2-Clause',
    licenseUrl: 'https://github.com/Leaflet/Leaflet/blob/main/LICENSE',
  },
});
