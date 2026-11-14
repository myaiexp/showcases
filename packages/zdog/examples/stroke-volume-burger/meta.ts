// Zdog example: Stroke volume burger, thick lines make flat shapes round
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stroke volume burger',
  summary:
    'A burger made of flat circles, a square of cheese and tiny line segments for sesame seeds. Zdog has no meshes: a thick stroke is what gives them body. Slide stroke to zero and the burger collapses into flat paper shapes; slide it up and the patty and seeds plump out.',
  section: 'Modeling',
  tags: ['stroke', 'Ellipse', 'Rect', 'Shape', 'Hemisphere', 'fill'],
  docs: ['repo/modules/docs/modeling-concepts.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
