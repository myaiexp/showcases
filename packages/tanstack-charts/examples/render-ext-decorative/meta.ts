// tanstack-charts example: decorative keeps paint and drops targets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "decorative keeps paint and drops targets",
  summary:
    "A filled area sits over a line. As a normal mark, the area is the topmost shape under the pointer, so it wins focus. Wrapped in decorative() it still paints but stops being a pointer or keyboard target, so the tooltip follows the line. The readout counts focus points per mark.",
  section: "Custom Extensions",
  tags: ['decorative', 'areaY', 'lineY', 'tooltip', 'scene.points'],
  docs: [
    'repo/docs/reference/custom-extensions.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
