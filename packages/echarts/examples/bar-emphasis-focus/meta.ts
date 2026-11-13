// echarts example: Bar emphasis focus and blurScope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar emphasis focus and blurScope',
  summary:
    'Two grids of the same three bar series. Hover a bar to fade the others, and switch emphasis.focus between series, self and none and emphasis.blurScope between the coordinate system, the series and global.',
  section: 'Option: series.bar',
  tags: ['bar', 'emphasis.focus', 'emphasis.blurScope', 'blur', 'grid'],
  docs: ['repo/en/option/series/bar.md', 'repo/en/option/partial/emphasis-common.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
