// Zdog example: front, top, side and isometric camera views of a little house
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View angles',
  summary:
    'A little house seen from the front, from above, from the side and from an isometric angle, with the camera gliding between them. The house never moves: the Illustration rotate option is the camera, so changing it is how you pick a view.',
  section: 'API: Illustration',
  tags: ['Illustration', 'rotate', 'Vector', 'lerp'],
  docs: ['repo/modules/docs/api-illo.hbs', 'repo/modules/docs/api-vector.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
