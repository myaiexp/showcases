// aframe example: Mixins: red cube and blue cube from shared definitions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mixins: red cube and blue cube from shared definitions',
  summary:
    'Three <a-mixin>s in <a-assets> (red, blue, cube) are combined by listing their ids in an entity\'s mixin attribute, so two entities get a box geometry with different colours. The board prints the resulting data.',
  section: 'Core API',
  tags: ['a-mixin', 'mixin', 'a-assets', 'geometry', 'material'],
  docs: ['repo/docs/core/mixins.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
