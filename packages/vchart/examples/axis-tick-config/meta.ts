// vchart example: Tick count, step and algorithm
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tick count, step and algorithm',
  summary:
    'tick.tickCount suggests a number of ticks, tickStep fixes the spacing and forceTickCount insists on a count; tickMode picks even or d3-style tick values and noDecimals drops fractional ticks. Selectors and a slider drive one linear axis.',
  section: 'Concepts: Axes',
  tags: ['tick.tickCount', 'tick.tickStep', 'tick.forceTickCount', 'tick.tickMode', 'tick.noDecimals'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/base-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
