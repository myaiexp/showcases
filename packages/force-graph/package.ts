// force-graph: 2D force-directed graphs drawn on an HTML5 canvas, laid out by d3-force
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'force-graph',
  npm: 'force-graph',
  tagline: 'Force-directed graphs on an HTML5 canvas: d3-force layout, zoom and pan, drag, hover and click.',
  about:
    'force-graph puts a d3-force simulation and a canvas renderer behind one chainable component. Nodes and links go in as plain objects and are styled through accessors that take a constant, an attribute name or a function of the datum; custom canvas painting can replace or extend any node, link or particle. Directional arrows and moving particles show link direction, DAG modes lay out hierarchies, and the d3 forces themselves can be reconfigured or replaced. Its three.js siblings are 3d-force-graph and the VR/AR variants.',
  category: 'Data/Viz',
  homepage: 'https://github.com/vasturiano/force-graph',
  docsUrl: 'https://github.com/vasturiano/force-graph#api-reference',
  repo: 'https://github.com/vasturiano/force-graph',
  added: '2026-11-15',
  sections: [
    'Quick start',
    'Data input',
    'Container layout',
    'Node styling',
    'Link styling',
    'Render control',
    'Force engine configuration',
    'Interaction',
    'Utility',
    'Input JSON syntax',
  ],
});
