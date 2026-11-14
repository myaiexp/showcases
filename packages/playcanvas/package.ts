// PlayCanvas: open-source WebGL and WebGPU 3D engine, used straight from npm
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'PlayCanvas',
  npm: 'playcanvas',
  tagline: 'An open-source WebGL and WebGPU engine: entity-component scenes, PBR, animation, physics, UI, XR and Gaussian splats.',
  about:
    'Every example drives the engine directly from the playcanvas npm package, with no Editor project behind it. They are built from the developer-site user manual (the engine chapters and the component reference) and the engine\'s type definitions, never from the official examples browser or the Editor-based tutorials. Models, textures and splats are generated in code, so cards download nothing. Most examples render on WebGL 2; the WebGPU-only features ask for WebGPU and say so when the browser has none.',
  category: 'Graphics',
  homepage: 'https://playcanvas.com',
  docsUrl: 'https://developer.playcanvas.com/user-manual/',
  repo: 'https://github.com/playcanvas/engine',
  added: '2026-11-14',
  // sidebars.js order: the Engine chapter, the component reference from the Editor
  // chapter, then the Common Topics. Graphics is split along its own sidebar groups.
  sections: [
    'Engine',
    'Components',
    'Entity Component System',
    'Assets',
    'Scripting',
    'Graphics: Cameras',
    'Graphics: Meshes',
    'Graphics: Lighting',
    'Graphics: Physically Based Rendering',
    'Graphics',
    'Graphics: Linear Workflow',
    'Graphics: Shaders',
    'Graphics: Post Effects',
    'Graphics: Advanced Rendering',
    'Gaussian Splatting',
    'Animation',
    'Physics',
    '2D',
    'User Interface',
    'XR',
    'Debugging and Optimization',
  ],
});
