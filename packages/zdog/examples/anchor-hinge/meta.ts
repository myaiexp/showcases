// Zdog example: Anchor as a hinge, a chest lid on an invisible pivot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Anchor as a hinge',
  summary:
    'A treasure chest whose lid swings open around its back edge. The lid is added to an Anchor, an invisible shape that only carries a position and rotation, placed exactly where the hinge should be. Move the hinge to the middle to see why the pivot point matters.',
  section: 'Modeling',
  tags: ['Anchor', 'addTo', 'rotate', 'translate', 'Box', 'visible'],
  docs: ['repo/modules/docs/modeling-concepts.hbs', 'repo/modules/docs/api-anchor.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
