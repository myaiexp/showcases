// tsl-textures example: Grid flat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grid flat',
  summary:
    "grid() with uvs set to screenUV, the docs' advice for flat surfaces: the plane becomes a window onto a grid fixed to the screen, with aspect set so its lines are as wide across as down.",
  section: 'Textures',
  tags: ['grid', 'colorNode', 'uvs', 'screenUV', 'screenSize', 'plane'],
  docs: ['repo/docs/grid.md', 'repo/src/grid.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
