// tanstack-charts example: Keyboard stops bounded on dense data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Keyboard stops bounded on dense data",
  summary:
    "A 3,000-point line gets a focus strategy that reuses the nearest-x pointer behaviour but returns only every hundredth point as a keyboard stop. Tab into the chart and press the arrow keys: thirty stops instead of three thousand. The readout reports both numbers.",
  section: "Large Data",
  tags: ['focusNearestX', 'ChartFocusStrategy', 'navigation', 'keyboard'],
  docs: ['repo/docs/guides/large-data.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
