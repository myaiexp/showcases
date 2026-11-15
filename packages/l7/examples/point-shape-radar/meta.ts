// l7 example: Point shape: radar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: radar",
  summary:
    "shape('radar') draws a rotating radar sweep around each point. It only appears with animate(true); size is its radius in pixels.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'radar', 'animate', 'size'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/point_layer/animate.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
