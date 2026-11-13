// Zdog: flat, designer-friendly pseudo-3D engine for canvas and SVG
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Zdog',
  npm: 'zdog',
  tagline: 'Round, flat, designer-friendly pseudo-3D engine rendered on a canvas.',
  about:
    'Zdog is "3D for designers": about 2,000 lines, yet a real 3D scene graph with positions, rotations and depth sorting, drawn in a flat vector style instead of lit polygons. Models are composed from primitives (boxes, cones, ellipses), spun in a render loop and orbited by dragging.',
  category: 'Graphics',
  homepage: 'https://zzz.dog',
  docsUrl: 'https://zzz.dog',
  repo: 'https://github.com/metafizzy/zdog',
  added: '2026-06-14',
  sections: ['Basics'],
});
