// g6 example: Custom combo: a rect with a count tag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom combo: a rect with a count tag',
  summary:
    'A RectCombo subclass that adds a child-count text with upsert in render; moving a node updates the tag.',
  section: 'Combo',
  tags: ['register', 'RectCombo', 'render', 'upsert', 'childrenData'],
  docs: [
    'repo/packages/site/docs/manual/element/combo/custom-combo.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
