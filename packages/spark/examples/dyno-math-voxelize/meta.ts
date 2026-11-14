// Spark example: round, floor, div and mix voxelising positions and colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Voxelising with round and floor',
  summary:
    'A modifier built from basic math blocks: dyno.round of centre / cell snaps splat positions to a grid, floor of colour × levels posterises their colours, and mix against an amount uniform fades between the smooth knot and its blocky version. Cell size, colour levels and amount are uniforms on sliders.',
  section: 'Dyno Standard Library',
  tags: ['round', 'floor', 'div', 'mul', 'mix', 'clamp', 'dynoFloat', 'objectModifiers'],
  docs: ['repo/docs/docs/dyno-stdlib.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
