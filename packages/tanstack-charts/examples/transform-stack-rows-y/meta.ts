// tanstack-charts example: stackRowsY endpoints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "stackRowsY endpoints",
  summary:
    "stackRowsY returns the input rows extended with y1 and y2, the stack endpoints, without drawing anything. Rect over those rows draws the same stack a barY would, and the select moves through the stack offsets and order the transform accepts.",
  section: "Data Transforms",
  tags: ["stackRowsY", "offset", "order", "rect"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
