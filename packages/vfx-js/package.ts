// VFX-JS: WebGL shader effects on DOM elements, images, video and page transitions
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'VFX-JS',
  npm: '@vfx-js/core',
  tagline: 'WebGL shader effects for ordinary HTML elements: images, video, text and whole page transitions.',
  about:
    'VFX-JS copies an element (an <img>, a <video>, a canvas, or plain text and HTML) into a WebGL texture, hides the original and draws it again through a shader in the same place, on one canvas over the page. The element stays real DOM: clicks, links, layout and screen readers still use it. Pick one of the built-in shader presets, write your own GLSL with multiple passes and feedback buffers, stack ready-made effects from @vfx-js/effects (bloom, halftone, pixel sort, fluid, particles), or animate an element from old content to new with the transitions in @vfx-js/transitions.',
  category: 'Graphics',
  homepage: 'https://amagi.dev/vfx-js',
  docsUrl: 'https://amagi.dev/vfx-js/getting-started/',
  repo: 'https://github.com/fand/vfx-js',
  added: '2026-11-14',
  // The docs sidebar order (amagi.dev/vfx-js: Getting Started, How it Works, Effects, Custom
  // Shaders, Custom Effects), with the Effects page split into its two halves and Custom
  // Shaders' multipass and post-effect parts given their own sections (docs/MULTIPASS.md,
  // docs/POSTEFFECT_EXAMPLE.md). Then the transitions site's order: How it works and the API,
  // Presets, Custom.
  sections: [
    'Getting Started',
    'How it Works',
    'Shader presets',
    '@vfx-js/effects',
    'Custom Shaders',
    'Multipass',
    'Post effects',
    'Custom Effects',
    'Transitions',
    'Transition presets',
    'Custom transitions',
  ],
});
