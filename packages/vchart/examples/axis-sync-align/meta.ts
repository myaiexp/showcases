// vchart example: Syncing two axes: zero and tick alignment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Syncing two axes: zero and tick alignment',
  summary:
    'A bar series with negative values and a line on a right axis with a different range. sync with zeroAlign makes the two zero lines meet; tickAlign keeps the ticks of the right axis in proportion to the left axis. A selector compares them to no sync.',
  section: 'Concepts: Axes',
  tags: ['axes.sync', 'zeroAlign', 'tickAlign', 'axisId', 'dual axis'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/linear-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
