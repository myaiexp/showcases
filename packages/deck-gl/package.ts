// deck.gl: GPU-powered layers for large-scale geospatial and 3D data visualization
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'deck.gl',
  npm: 'deck.gl',
  tagline: 'GPU-powered layers for large-scale geospatial and 3D data visualization.',
  about:
    'deck.gl draws data as layers on the GPU: points, arcs, paths, polygons, text, icons, meshes, hexagon and grid aggregations, heatmaps, map tiles and animated trips, each one a declarative list of props and accessors. Views and controllers place them on a web-mercator map, a globe, an orbit around a 3D model or a flat 2D plane; extensions add filtering, brushing, masking and dashed lines; widgets add the controls. Every example here draws on local data (Natural Earth countries and seeded samples), so nothing waits on a tile server.',
  category: 'Graphics',
  homepage: 'https://deck.gl',
  docsUrl: 'https://deck.gl/docs',
  repo: 'https://github.com/visgl/deck.gl',
  added: '2026-11-14',
  // The docs' table of contents (docs/table-of-contents.json): Getting Started, the
  // Developer Guide's topics, then the API reference's chapters and submodules. Transitions,
  // Effects and Lights fold into the guide topics of the same name, the Developer Guide's
  // views page into Views.
  sections: [
    'Getting started',
    'Using layers',
    'Interactivity',
    'Coordinate systems',
    'Animations and transitions',
    'Data and performance',
    'Effects and lighting',
    'Base maps',
    'Custom layers',
    'Custom widgets',
    'Deck',
    'Core layers',
    'Aggregation layers',
    'Geo layers',
    'Mesh layers',
    'Viewports',
    'Views',
    'Controllers',
    'Extensions',
    'JSON',
    'Widgets',
  ],
});
