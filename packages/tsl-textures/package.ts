// tsl-textures: procedural TSL textures for three.js, on the Three.js gallery's three/webgpu
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'tsl-textures',
  npm: 'tsl-textures',
  tagline: 'About fifty procedural textures written in TSL: marble, wood, planets, water, plus shape textures that bend geometry.',
  about:
    'Each texture is a function that returns a TSL node, built on the GPU at run time instead of loaded from an image. Assign it to a node material slot (colorNode for most, normalNode, opacityNode or positionNode for some). Every example here runs on three/webgpu and its WebGPURenderer, the same three.js core the Three.js gallery uses, and passes the parameters in as uniforms so the panel restyles a texture without rebuilding its shader.',
  category: 'Graphics',
  homepage: 'https://boytchev.github.io/tsl-textures/',
  docsUrl: 'https://boytchev.github.io/tsl-textures/',
  repo: 'https://github.com/boytchev/tsl-textures',
  added: '2026-11-15',
  // The home page (index.html) lists Textures, then Shape textures. Getting started is
  // the README's usage section; Utilities is src/tsl-utils.js, which the entry re-exports.
  sections: ['Getting started', 'Textures', 'Shape textures', 'Utilities'],
});
