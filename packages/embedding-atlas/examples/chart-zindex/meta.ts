// embedding-atlas example: layer zIndex above and below the grid lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer order with zIndex",
  summary:
    "An area layer and a bar layer overlap. With zIndex the area is drawn above the bars, below them, or (negative) under the grid lines too, which shows when the grid shines through.",
  section: "Charts",
  tags: ['zIndex', 'layers', 'mark: area', 'mark: bar'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
