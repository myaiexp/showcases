// g6 example: Click select: multiple selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click select: multiple selection',
  summary: 'multiple: true with a trigger key (Shift, Meta or Alt) lets clicks add to the selection, and drag-element moves the whole selection. The card clicks three nodes with an empty trigger.',
  section: 'Behavior',
  tags: ['click-select', 'multiple', 'trigger', 'drag-element'],
  docs: ['repo/packages/site/docs/manual/behavior/ClickSelect.en.md', 'repo/packages/site/common/api/behaviors/click-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
