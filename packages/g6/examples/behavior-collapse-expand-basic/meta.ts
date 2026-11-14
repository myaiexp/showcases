// g6 example: Collapse expand: double-click a combo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collapse expand: double-click a combo',
  summary: "collapse-expand folds a combo's children into it on double click and unfolds them on the next, with an animation toggle. The card sends double clicks to a combo nested in another.",
  section: 'Behavior',
  tags: ['collapse-expand', 'animation', 'combo'],
  docs: ['repo/packages/site/docs/manual/behavior/CollapseExpand.en.md', 'repo/packages/site/common/api/behaviors/collapse-expand.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
