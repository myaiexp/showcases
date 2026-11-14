// echarts example: Bar selectedMode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar selectedMode',
  summary:
    'Click bars to select them in multiple, single or whole-series mode. Selected bars take the select style, Wednesday is disabled, and two buttons drive the select and unselect actions.',
  section: 'Option: series.bar',
  tags: ['bar', 'selectedMode', 'select', 'select.disabled', 'dispatchAction'],
  docs: ['repo/en/option/series/bar.md', 'repo/en/option/partial/selected-mode.md', 'repo/en/option/partial/select-common.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
