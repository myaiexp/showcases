// vchart example: Band padding: paddingInner, paddingOuter and trimPadding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Band padding: paddingInner, paddingOuter and trimPadding',
  summary:
    'A grouped bar chart whose band axis spacing is set per level: paddingInner between groups, paddingOuter at the ends, or trimPadding to remove the end space altogether, which also ignores the other two.',
  section: 'Concepts: Axes',
  tags: ['paddingInner', 'paddingOuter', 'bandPadding', 'trimPadding', 'grouped bar'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/band-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
