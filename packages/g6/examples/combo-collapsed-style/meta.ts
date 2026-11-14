// g6 example: Combo collapsed styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Combo collapsed styles',
  summary:
    'The collapsed-prefixed styles (fill, stroke, line dash, size) apply only to a collapsed combo; one combo starts collapsed and the other expanded; double-click a combo in the full view to toggle it.',
  section: 'Combo',
  tags: ['collapsed', 'collapsedFill', 'collapsedStroke', 'collapsedLineDash', 'collapsedSize'],
  docs: [
    'repo/packages/site/docs/manual/element/combo/BaseCombo.en.md',
    'repo/packages/site/docs/api/element.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
