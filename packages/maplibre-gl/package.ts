// MapLibre GL JS: open-source WebGL maps from vector tiles and style documents
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'MapLibre GL JS',
  npm: 'maplibre-gl',
  tagline: 'GPU-rendered interactive maps driven by a JSON style document.',
  about:
    'MapLibre GL JS draws maps with WebGL from vector tiles, GeoJSON, rasters and elevation data, styled by the MapLibre Style Spec: layers of fills, lines, circles, symbols, heatmaps and 3D extrusions whose paint can be data-driven expressions. It adds 3D terrain, a globe projection, markers, popups and controls. Every example here draws on local data (Natural Earth countries and computed tiles), so nothing waits on a tile server.',
  category: 'Graphics',
  homepage: 'https://maplibre.org/',
  docsUrl: 'https://maplibre.org/maplibre-gl-js/docs/',
  repo: 'https://github.com/maplibre/maplibre-gl-js',
  added: '2026-11-13',
  // The API reference's chapters (Main, Markers and Controls, Geography and Geometry,
  // Handlers, Sources, Event Related), then the style spec's, then the guides.
  sections: [
    'Getting started',
    'Map',
    'Global functions',
    'Markers and controls',
    'Geography and geometry',
    'Handlers',
    'Sources',
    'Events',
    'Layers',
    'Expressions',
    'Terrain, sky and light',
    'Projection',
    'Transitions',
    'Guides',
  ],
});
