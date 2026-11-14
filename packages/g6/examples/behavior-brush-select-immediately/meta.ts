// g6 example: Brush select: immediately
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush select: immediately',
  summary: 'With immediately: true and trigger: [], elements switch state while the box is still being dragged; a toggle turns it off so only the release selects.',
  section: 'Behavior',
  tags: ['brush-select', 'immediately', 'trigger'],
  docs: ['repo/packages/site/docs/manual/behavior/BrushSelect.en.md', 'repo/packages/site/common/api/behaviors/brush-select.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
