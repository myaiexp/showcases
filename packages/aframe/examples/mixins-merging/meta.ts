// aframe example: Mixins: properties of one component merge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mixins: properties of one component merge',
  summary:
    'Mixins wide, tall and box each set one geometry property and the entity sets depth. All four merge into one geometry. Changing the mixin attribute drops or re-adds parts and the board shows the result.',
  section: 'Core API',
  tags: ['mixin', 'merging', 'geometry', 'setAttribute'],
  docs: ['repo/docs/core/mixins.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
