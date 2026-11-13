// echarts example: Beeswarm and scatter jitter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Beeswarm and scatter jitter',
  summary:
    'Dense scatter points on a category axis, first piled on top of each other, then spread by xAxis.jitter, then laid out without overlap as a beeswarm with jitterOverlap: false.',
  section: "What's New in 6",
  tags: ['xAxis.jitter', 'jitterOverlap', 'jitterMargin', 'scatter'],
  docs: ['repo/contents/en/basics/release-note/v6-feature.md', 'repo/en/option/component/axis-common.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
