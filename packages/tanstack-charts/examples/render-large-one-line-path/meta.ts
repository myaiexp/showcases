// tanstack-charts example: One line path holds many rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One line path holds many rows",
  summary:
    "A line mark paints every observation through a single polyline, so the DOM stays nearly constant while the row count grows. The scene still holds one interaction point per row and one focus-candidate dot per row that is not painted until focus asks for it. The slider sets the row count from a hundred to thirty thousand and the readout compares scene nodes, points and DOM elements.",
  section: "Large Data",
  tags: ['lineY', 'scene.nodes', 'scene.points', 'polyline', 'DOM size'],
  docs: [
    'repo/docs/guides/large-data.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
