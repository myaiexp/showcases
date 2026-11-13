// Getting started example: importing from subpaths such as animejs/animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Getting started module imports and subpaths',
  summary: 'Words fade to random opacities using animate, splitText, stagger and random imported from the animejs/animation, animejs/text and animejs/utils subpaths. A readout confirms they are the same functions the main module exports.',
  section: 'Getting started',
  tags: ['animejs/animation', 'animejs/text', 'animejs/utils', 'import', 'subpath'],
  docs: [
    'pages/animejs-com/documentation/getting-started/module-imports.md',
    'pages/animejs-com/documentation/getting-started.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
