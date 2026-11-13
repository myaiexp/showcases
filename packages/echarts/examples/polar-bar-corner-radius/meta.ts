// echarts example: Polar bar corner radii
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polar bar corner radii',
  summary:
    'Two stacked series of polar bar sectors. Pick the itemStyle.borderRadius form (one number, a percentage, an inner/outer pair, or four corners from the inside out) and the border width.',
  section: 'Option: series.bar',
  tags: ['bar', 'polar', 'itemStyle.borderRadius', 'borderWidth', 'stack', 'angleAxis'],
  docs: ['repo/en/option/series/bar.md', 'repo/en/option/partial/sector-border-radius.md', 'repo/en/option/partial/stack.md', 'repo/contents/en/basics/release-note/5-3-0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
