// vchart example: Axis label sampling and minGap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis label sampling and minGap',
  summary:
    'With eighty categories the band axis thins its labels by sampling the data before it draws them, keeping at least minGap pixels between labels. Turn sampling off to see every label crowd, or widen minGap to thin them further.',
  section: 'Concepts: Axes',
  tags: ['axes.sampling', 'label.minGap', 'band axis', 'label overlap'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/base-axis.md', 'repo/docs/assets/option/en/component/axis-common/axis-label.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
