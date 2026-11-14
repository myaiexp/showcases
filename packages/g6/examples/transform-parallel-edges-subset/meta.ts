// g6 example: Transform: process-parallel-edges edges option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: process-parallel-edges edges option",
  summary: "The edges option limits bundling to the listed edge ids. Other parallel edges stay straight and overlap.",
  section: 'Transform',
  tags: ["transforms", "process-parallel-edges", "edges", "updateTransform"],
  docs: [
    "repo/packages/site/docs/manual/transform/ProcessParallelEdges.en.md",
    "repo/packages/site/docs/api/transform.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
