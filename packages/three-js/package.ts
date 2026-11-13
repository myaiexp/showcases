// Three.js: 3D library for the web, shown here on its WebGPU renderer and TSL
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Three.js',
  npm: 'three',
  tagline: 'The 3D library of the web: scene graph, materials, lights and loaders, on WebGPU or WebGL 2.',
  about:
    'Every example here runs on WebGPURenderer, imported from three/webgpu. It renders through WebGPU where the browser has it and falls back to a WebGL 2 backend where it does not. Custom shading is written in TSL, the three.js shading language: JavaScript node graphs that compile to WGSL or GLSL depending on the backend, which replaces ShaderMaterial and onBeforeCompile.',
  category: 'Graphics',
  homepage: 'https://threejs.org',
  docsUrl: 'https://threejs.org/manual/',
  repo: 'https://github.com/mrdoob/three.js',
  added: '2026-11-13',
  // The manual's chapter groups (manual/list.json), with the TSL reference from
  // docs/llms-full.txt placed after the WebGPU chapters it builds on.
  sections: [
    'Getting Started',
    'Next Steps',
    'Basics',
    'Fundamentals',
    'Tips',
    'Optimization',
    'Solutions',
    'WebGPU',
    'TSL',
    'WebXR',
  ],
});
