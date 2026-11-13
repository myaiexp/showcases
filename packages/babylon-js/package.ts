// Babylon.js: a full 3D engine for the web, shown here on its WebGL engine and its ES6 packages
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Babylon.js',
  npm: '@babylonjs/core',
  tagline: 'A complete real-time 3D engine: scene graph, PBR materials, particles, physics, GUI and post-processing.',
  about:
    'Every example imports the ES6 packages and renders through the WebGL Engine: @babylonjs/core, plus the companion packages a chapter needs (gui, havok for physics, addons with recast-navigation for crowds, loaders and serializers, viewer, smart-filters, controls). Models, textures and sounds are generated in code, so nothing is downloaded. The docs refer to Playground snippets for their full demos; those are a demo gallery, so these examples are built from the docs text and the API alone.',
  category: 'Graphics',
  homepage: 'https://www.babylonjs.com',
  docsUrl: 'https://doc.babylonjs.com',
  repo: 'https://github.com/BabylonJS/Babylon.js',
  added: '2026-11-13',
  // configuration/structure.json, features: the starter scene, the guided Introduction
  // (its nine chapters folded into one section) and the Deep Dive chapters in order.
  sections: [
    'Starter Scene',
    'Introduction',
    'Animation',
    'Audio',
    'Behaviors',
    'Cameras',
    '2D Controls',
    'Crowd Navigation',
    'Environment',
    'Events',
    'Exporters',
    'Flow Graph',
    'Frame Graph',
    'Geospatial',
    'GUI',
    'Input',
    'Importing Assets',
    'Lights',
    'Materials',
    'Mesh',
    'Occlusion Queries',
    'Particles',
    'Physics',
    'Post Processes',
    'Scene',
    'Smart Filters',
    'Sprites',
    'Tags',
    'Viewer',
    'WebXR',
  ],
});
