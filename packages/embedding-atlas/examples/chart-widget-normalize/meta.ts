// embedding-atlas example: an encoding.normalize widget with options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Normalize widget",
  summary:
    "The encoding.normalize widget switches an encoding between raw and normalized values. Here it targets the color attribute of a topic by source heatmap, offering x and y; layer says which layer it edits (a number, or a list of layers).",
  section: "Charts",
  tags: ['widgets', 'encoding.normalize', 'layer', 'attribute', 'options', 'normalize'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
