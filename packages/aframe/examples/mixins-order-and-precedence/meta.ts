// aframe example: Mixins: order and precedence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mixins: order and precedence',
  summary:
    'With red then blue the right-most mixin wins and the box is blue; with blue then red it is red; a colour on the entity itself overrides both mixins and gives green. The board prints each result.',
  section: 'Core API',
  tags: ['mixin', 'precedence', 'order', 'material'],
  docs: ['repo/docs/core/mixins.md', 'repo/docs/core/entity.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
