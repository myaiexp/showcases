// cobe: a 5 KB WebGL globe of dots, with markers, arcs and CSS-anchored labels
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'cobe',
  npm: 'cobe',
  tagline: 'A 5 KB WebGL globe drawn as dots, with markers, arcs and CSS-anchored labels.',
  about:
    'COBE draws a whole globe in one fragment shader: land is a cloud of dots laid out on a spherical Fibonacci lattice and lit like a ball, with an atmospheric glow around it. Version 2 adds arcs between places and exposes every marker and arc with an id as a CSS anchor plus a visibility variable, so plain DOM labels can ride on the globe and fade when they turn away. There is no loop inside: you call update() whenever the globe should change.',
  category: 'Graphics',
  homepage: 'https://cobe.vercel.app',
  docsUrl: 'https://cobe.vercel.app',
  repo: 'https://github.com/shuding/cobe',
  added: '2026-11-15',
  sections: ['Usage', 'Options', 'Methods', 'Recipes', 'Markers & Arcs', 'Custom Labels'],
});
