// tanstack-charts example: Styled focus labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Styled focus labels",
  summary:
    "The x label of a focus guide is a pill with its own background, text color, padding and weight, and a formatter that turns the month number into a name. A select moves it between the two x edges with the side option.",
  section: "Focus Guide Marks",
  tags: ['focusGuideX', 'xLabel', 'side', 'offset', 'background', 'format'],
  docs: [
    'repo/docs/reference/marks/focus-guide.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
