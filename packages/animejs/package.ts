// anime.js: lightweight animation engine for CSS, SVG, DOM attributes and JS objects
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'anime.js',
  npm: 'animejs',
  tagline: 'A fast, all-in-one animation engine for CSS, SVG, DOM attributes and JS objects.',
  about:
    'anime.js v4 is a modular animation engine: one animate() call tweens CSS properties, transforms, SVG attributes or plain object values, and the same engine drives timelines, stagger patterns, draggable elements, scroll-synced playback, text splitting, SVG morphing and line drawing, and layout transitions. Each module is a separate import, so a page only ships the parts it uses.',
  category: 'Animation',
  homepage: 'https://animejs.com',
  docsUrl: 'https://animejs.com/documentation/',
  repo: 'https://github.com/juliangarnier/anime',
  added: '2026-11-13',
  // The official docs' chapter order (animejs.com/documentation sidebar).
  sections: [
    'Getting started',
    'Timer',
    'Animation',
    'Timeline',
    'Animatable',
    'Draggable',
    'Layout',
    'Scope',
    'Events',
    'SVG',
    'Text',
    'Utilities',
    'Easings',
    'WAAPI',
    'Engine',
    'Adapters',
  ],
});
