// Zdog example: a sunflower placed by rotating one Vector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sunflower from rotated vectors',
  summary:
    'A sunflower swaying on its stem, its petals in a ring and its seeds in a spiral. Every position comes from one idea: take a vector, copy it, and rotate the copy a fraction of a turn. vector.rotate({ z }) is how you place things evenly around a point. The sliders change the petal and seed counts.',
  section: 'API: Vector',
  tags: ['Vector', 'rotate', 'copy', 'TAU', 'Group'],
  docs: ['repo/modules/docs/api-vector.hbs', 'repo/modules/docs/group-concept.hbs', 'repo/modules/docs/api-utils.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
