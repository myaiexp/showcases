// vchart example: Nice, zero and expand on a value axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nice, zero and expand on a value axis',
  summary:
    'Without min and max, a linear axis adjusts its range by nice (round end values), zero (include 0) and expand (extra room by proportion). Selectors and sliders switch each one; niceType decides between a round end and an exact one at a low tick count.',
  section: 'Concepts: Axes',
  tags: ['axes.nice', 'axes.niceType', 'axes.zero', 'axes.expand', 'tick.tickCount'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/linear-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
