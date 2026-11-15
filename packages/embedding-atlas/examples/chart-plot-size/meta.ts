// embedding-atlas example: plotSize width, height and aspectRatio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Plot size",
  summary:
    "plotSize fixes the plot area instead of letting it fill the cell: a 300 by 150 pixel plot, a square one through aspectRatio: 1, and a wide one with aspectRatio: 3.",
  section: "Charts",
  tags: ['plotSize', 'width', 'height', 'aspectRatio'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
