// penrose example: hsva: a hue wheel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'hsva: a hue wheel',
  summary:
    '`hsva(h, s, v, a)` takes hue in degrees from 0 to 360, saturation and value from 0 to 100, and opacity from 0 to 1. Twelve discs step the hue around a ring while saturation and value are sampled, so a variation can run from vivid to washed out or dark.',
  section: 'Computation: Colors & Sampling',
  tags: ['hsva', 'unitVector', 'toRadians'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
