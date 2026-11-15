// tanstack-charts example: Keys that survive an edit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Keys that survive an edit",
  summary:
    "Motion and focus restore depend on keys that stay attached to the same row. A dot mark is built from four rows, then again after one value is edited and the order is reversed, and the page compares each key across the two scenes. With a row name as the key, every key keeps its row. Inferred keys are built from the channel values, so the edited row gets a new key and counts as a different row.",
  section: "Testing and Debugging",
  tags: ['createChartScene', 'key', 'scene.points', 'identity', 'dot'],
  docs: [
    'repo/docs/guides/testing-and-debugging.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
