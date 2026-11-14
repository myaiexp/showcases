// vchart example: Symlog axis: a log-like scale that takes negative values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Symlog axis: a log-like scale that takes negative values',
  summary:
    'Values from minus eight thousand to plus eight thousand cannot sit on a log axis, but a symlog axis compresses both signs around zero. A constant slider reshapes the linear region near zero; the card flips between linear and symlog.',
  section: 'Concepts: Axes',
  tags: ['axes.type: symlog', 'constant', 'negative values'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/symlog-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
