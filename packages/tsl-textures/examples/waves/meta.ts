// tsl-textures example: Waves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waves',
  summary:
    'waves() on colorNode and waves.opacity() on opacityNode of a transparent, double-sided material: a water line that moves with the TSL time node, leaving the part above the waves clear. Speed, level, roughness, height, foam size and edge are live.',
  section: 'Textures',
  tags: ['waves', 'colorNode', 'opacityNode', 'transparent', 'foam'],
  docs: ['repo/docs/waves.md', 'repo/src/waves.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
