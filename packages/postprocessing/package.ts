// postprocessing: fullscreen effects for three.js, merged into as few shader passes as possible
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'postprocessing',
  npm: 'postprocessing',
  tagline: 'Fullscreen effects for three.js: bloom, depth of field, SSAO, god rays, SMAA, LUTs, glitch and more.',
  about:
    'An EffectComposer runs a chain of passes over a three.js WebGLRenderer: a RenderPass draws the scene, and an EffectPass merges any set of effects into one compound shader, so stacking effects costs little. Every example here builds its scene in code and runs postprocessing 6.39 on three 0.187. The repo\'s manual is partly written for the coming v7 API, so the examples follow the README and the JSDoc in src/, which is what 6.39 runs.',
  category: 'Graphics',
  homepage: 'https://github.com/pmndrs/postprocessing',
  docsUrl: 'https://pmndrs.github.io/postprocessing/public/docs/',
  repo: 'https://github.com/pmndrs/postprocessing',
  added: '2026-11-15',
  // Usage is the README's setup sections. The effect sections follow the README's
  // "Included Effects" list; Other effects holds the src/effects classes that list leaves
  // out. Blending, Passes and Utilities follow the JSDoc's folders (enums, passes, core),
  // and Custom effects is the manual page of that name read against the v6 Effect JSDoc.
  sections: [
    'Usage',
    'Antialiasing',
    'Bloom',
    'Blur',
    'Color Depth',
    'Color Grading',
    'Depth of Field',
    'Glitch',
    'God Rays',
    'Pattern',
    'Pixelation',
    'Outline',
    'Shock Wave',
    'SSAO',
    'Texture',
    'Tone Mapping',
    'Other effects',
    'Blending',
    'Passes',
    'Custom effects',
    'Utilities',
  ],
});
