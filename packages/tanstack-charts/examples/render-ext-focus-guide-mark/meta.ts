// tanstack-charts example: A focusGuideOnly mark with its own resolver
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A focusGuideOnly mark with its own resolver",
  summary:
    "A custom mark with focusGuideOnly: true emits no nodes. It returns one focus guide whose resolve callback draws a caret under the plot and the focused value, so it appears only while a point is focused. The line mark underneath supplies the focus, and the guide mark adds no points of its own.",
  section: "Custom Extensions",
  tags: ['createMark', 'focusGuideOnly', 'focusGuides', 'MarkFocusGuide', 'resolve'],
  docs: [
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/custom-extensions.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
