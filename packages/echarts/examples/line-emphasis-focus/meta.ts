// echarts example: Emphasis focus and blur scope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Emphasis focus and blur scope',
  summary:
    'Two grids with three lines each. Hover a line and choose what happens to the rest: emphasis.focus none, self or series, and blurScope coordinateSystem, series or global. Also set the emphasis scale and how faded the blurred lines become.',
  section: 'Option: series.line',
  tags: ['emphasis', 'focus', 'blurScope', 'scale', 'blur', 'lineStyle.opacity', 'dispatchAction'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/emphasis-common.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
