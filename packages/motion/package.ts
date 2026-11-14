// Motion: animation library for the web, built on the Web Animations API
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Motion',
  npm: 'motion',
  tagline: 'Animate anything on a web page: springs, timelines, scroll, gestures and layout changes.',
  about:
    "Motion (formerly Motion One) animates HTML, SVG, plain JavaScript objects and Three.js scenes with one animate() function. Its hybrid engine hands what it can to the browser's Web Animations API, so most animations keep running smoothly while the page is busy. Around animate() sit timelines that can be changed while they play, springs, scroll-linked and scroll-triggered effects, drag and pinch gestures with momentum, layout and view transitions, and motion values that pipe one changing number into many styles.",
  category: 'Animation',
  homepage: 'https://motion.dev',
  docsUrl: 'https://motion.dev/docs/quick-start',
  repo: 'https://github.com/motiondivision/motion',
  added: '2026-03-03',
  // The JavaScript docs sidebar at motion.dev/docs, in order. The Animations group is split
  // into its pages, which carry most of the API. Motion UI (Motion+ only) has no section.
  sections: [
    'Get started',
    'animate',
    'Timeline sequences',
    'animateLayout',
    'animateView',
    'scroll',
    'Easing',
    'Gestures',
    'Effects',
    'Utils',
    'Motion values',
    'Integrations',
    'Guides',
  ],
});
