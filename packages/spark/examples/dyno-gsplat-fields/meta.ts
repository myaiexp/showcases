// Spark example: splitGsplat and combineGsplat reading and writing splat fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reading and writing splat fields',
  summary:
    'splitGsplat pulls a splat’s centre, scales, rgba and opacity out as separate values, and combineGsplat writes new ones back. Here the scales grow with the splat’s height and the opacity falls off with distance from a point that wanders through the knot (the white marker). Each rule has its own checkbox.',
  section: 'Dyno Standard Library',
  tags: ['splitGsplat', 'combineGsplat', 'smoothstep', 'mix', 'distance', 'objectModifiers'],
  docs: ['repo/docs/docs/dyno-stdlib.md', 'repo/docs/docs/dyno-overview.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
