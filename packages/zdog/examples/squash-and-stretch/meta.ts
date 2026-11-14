// Zdog example: Squash and stretch, a jelly cube bouncing with Anchor scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Squash and stretch',
  summary:
    'A jelly cube with eyes bounces on a floor, stretching tall in the air and flattening when it lands. The squash comes from setting a different scale on each axis of the Anchor it sits in. Scale resizes the geometry but leaves the line width alone, so the edges stay crisp.',
  section: 'API: Anchor',
  tags: ['Anchor', 'scale', 'translate', 'Box', 'Ellipse', 'stroke'],
  docs: ['repo/modules/docs/api-anchor.hbs', 'repo/modules/docs/shapes-composite.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
