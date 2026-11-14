// vchart example: Log axis and its base
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Log axis and its base',
  summary:
    'The same eight values that span four orders of magnitude, drawn on a linear axis and on a log axis, where equal ratios take equal distance. A base slider changes the logarithm base in the full view; the card toggles the axis type.',
  section: 'Concepts: Axes',
  tags: ['axes.type: log', 'base', 'axes.type: linear'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/log-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
