// Zdog example: a treasure chest lid scrubbed open by dragging
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dragger: a scrub control',
  summary:
    'A treasure chest whose lid follows your finger: drag right to open it on its hinge and left to close it. Dragger is not only for rotating a scene, so onDragMove turns the horizontal distance into any value you like, here the lid angle.',
  section: 'API: Dragger',
  tags: ['Dragger', 'onDragStart', 'onDragMove', 'Anchor', 'Box'],
  docs: ['repo/modules/docs/api-dragger.hbs', 'repo/modules/docs/api-anchor.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
