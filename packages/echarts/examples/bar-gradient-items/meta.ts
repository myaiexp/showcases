// echarts example: Gradient fill per bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gradient fill per bar',
  summary:
    'Twelve bars filled with linear gradients. Change the gradient direction, colour each bar from a callback that reads its value, or make one gradient span the whole chart with global.',
  section: 'Option: series.bar',
  tags: ['bar', 'itemStyle.color', 'colorStops', 'global', 'itemStyle.borderRadius'],
  docs: [
    'repo/en/option/series/bar.md',
    'repo/en/option/option.md',
    'repo/en/option/partial/color-desc.md',
    'repo/en/option/partial/component-common-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
