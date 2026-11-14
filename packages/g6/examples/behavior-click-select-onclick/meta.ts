// g6 example: Click select: onClick callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click select: onClick callback',
  summary: 'onClick runs after each click with the pointer event, so its targetType and target id can be read. The full view logs it; the card counts clicks in a node label.',
  section: 'Behavior',
  tags: ['click-select', 'onClick', 'targetType'],
  docs: ['repo/packages/site/docs/manual/behavior/ClickSelect.en.md', 'repo/packages/site/common/api/behaviors/click-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
