// A-Frame: HTML elements for 3D and XR scenes, an entity-component system over three.js
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'A-Frame',
  npm: 'aframe',
  tagline: 'A web framework for 3D and VR: write a scene in HTML, extend it with components.',
  about:
    'A-Frame puts a three.js scene in the DOM. An <a-scene> holds entities, and each entity gets its look and behaviour from components set as HTML attributes: geometry, material, light, animation, sound, text, raycaster, controls. Primitives such as <a-box> and <a-sky> are entities with components preset. JavaScript extends it by registering components, systems, shaders and primitives, and it reaches the three.js objects underneath through object3D. The same scene enters VR or AR in a WebXR browser. Every example here runs in its own iframe, so each has its own copy of A-Frame and its registries.',
  category: 'Graphics',
  homepage: 'https://aframe.io/',
  docsUrl: 'https://aframe.io/docs/1.8.0/introduction/',
  repo: 'https://github.com/aframevr/aframe',
  added: '2026-11-15',
  // The docs' own chapter order (docs/*/: introduction, guides, core, components, primitives).
  sections: ['Introduction', 'Guides', 'Core API', 'Components', 'Primitives'],
});
