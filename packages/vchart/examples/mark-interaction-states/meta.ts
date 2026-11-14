// vchart example: Mark states: hover and selected
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mark states: hover and selected',
  summary:
    'The point mark of a line series styles its hover and selected states: a red fill on hover, a bigger size when selected. The card drives the states with setHovered and setSelected; in the full view hover or click the points, or pick the colour and size.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['point.style', 'point.state.hover', 'point.state.selected', 'setHovered', 'setSelected'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Mark.md', 'repo/docs/assets/api/en/API/vchart.md', 'repo/docs/assets/option/en/common/mark-state-style.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
