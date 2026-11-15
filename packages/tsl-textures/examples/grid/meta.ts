// tsl-textures example: Grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grid',
  summary:
    "grid() on colorNode: a latitude-longitude grid that keeps line widths even on a sphere, with cell counts, aspect, thinness, the equirectangular flag and both colours live.",
  section: 'Textures',
  tags: ['grid', 'colorNode', 'countU', 'countV', 'equirectangular'],
  docs: ['repo/docs/grid.md', 'repo/src/grid.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
