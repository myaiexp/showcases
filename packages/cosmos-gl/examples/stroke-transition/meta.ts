// cosmos-gl example: Stroke transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke transition",
  summary:
    "setPointStrokeColors and setPointStrokeWidths animate like fill colours and sizes. The rings round a grid of points change colour and widen on the next render().",
  section: "Transitions",
  tags: ["setPointStrokeColors", "setPointStrokeWidths", "render"],
  docs: ['repo/src/stories/configuration.mdx', 'repo/history/2026/2026-04-22-gpu-transitions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
