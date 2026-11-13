// echarts example: Tooltips on truncated axis labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltips on truncated axis labels',
  summary:
    'Six long category names on a y axis, cut by axisLabel width and overflow. Hover a label for its tooltip (5.6), with a formatter that reports isTruncated; shrink the width, switch overflow to break or breakAll, or turn the tooltip off.',
  section: 'Option: Components',
  tags: ['yAxis.tooltip', 'axisLabel.width', 'axisLabel.overflow', 'ellipsis', 'triggerEvent', 'isTruncated', 'tickIndex'],
  docs: [
    'repo/en/option/component/axis-common.md',
    'repo/en/option/component/y-axis.md',
    'repo/en/option/partial/text-style.md',
    'repo/en/option/partial/tooltip-common.md',
    'repo/contents/en/basics/release-note/5-6-0.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
