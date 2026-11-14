// g6 example: Click select: state names
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click select: state names',
  summary: 'state, neighborState and unselectedState take any state name: the clicked node turns green, its neighbours get an orange halo and the rest are dimmed. Selects swap the names.',
  section: 'Behavior',
  tags: ['click-select', 'state', 'neighborState', 'unselectedState', 'halo'],
  docs: ['repo/packages/site/docs/manual/behavior/ClickSelect.en.md', 'repo/packages/site/common/api/behaviors/click-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
