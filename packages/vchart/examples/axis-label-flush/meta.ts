// vchart example: Flush: pulling the end labels inward
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flush: pulling the end labels inward',
  summary:
    'On a linear x axis the first and last labels are centred on the axis ends and stick out past the plot. label.flush moves them inside so their edges line up with the ends.',
  section: 'Concepts: Axes',
  tags: ['label.flush', 'linear axis', 'scatter'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/cartesian-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
