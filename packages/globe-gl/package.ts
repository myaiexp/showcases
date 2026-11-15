// globe.gl: a Three.js globe component with fifteen data layers, orbit camera
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'globe.gl',
  npm: 'globe.gl',
  tagline: 'A Three.js globe component: points, arcs, polygons, heatmaps, hexbins, labels and more on one sphere.',
  about:
    'globe.gl wraps the three-globe plugin into a ready-made component: one call puts a WebGL globe with orbit controls, tooltips and click and hover events into a DOM element. Data goes in through fifteen layers, each fed an array and styled through accessors that take a constant, an attribute name or a function of the datum. Changes to the data animate by default, and the internal Three.js scene, camera, renderer and post-processing composer are all reachable for anything the layers do not cover.',
  category: 'Data/Viz',
  homepage: 'https://github.com/vasturiano/globe.gl',
  docsUrl: 'https://github.com/vasturiano/globe.gl#api-reference',
  repo: 'https://github.com/vasturiano/globe.gl',
  added: '2026-11-15',
  sections: [
    'Quick start',
    'Initialisation',
    'Container Layout',
    'Globe Layer',
    'Points Layer',
    'Arcs Layer',
    'Polygons Layer',
    'Paths Layer',
    'Heatmaps Layer',
    'Hex Bin Layer',
    'Hexed Polygons Layer',
    'Tiles Layer',
    'Particles Layer',
    'Rings Layer',
    'Labels Layer',
    'HTML Elements Layer',
    '3D Objects Layer',
    'Custom Layer',
    'Render Control',
    'Utility',
  ],
});
