// tanstack-charts example: focusAnchors reveal decorative geometry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "focusAnchors reveal decorative geometry",
  summary:
    "A decorative highlight mark returns focusAnchors beside its nodes and is wrapped in whenFocused. Only the band whose anchor matches the focused point's x value is painted, yet the bands never become pointer targets or tooltip data: the line below remains the only thing that is focused.",
  section: "Custom Marks and Renderers",
  tags: ['createMark', 'focusAnchors', 'whenFocused', 'ChartFocusAnchor'],
  docs: [
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/custom-extensions.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
