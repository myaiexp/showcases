// l7 example: Layer option: pickingBuffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option: pickingBuffer",
  summary:
    "pickingBuffer widens the area that counts as a hit. These dots are 3px, hard to hover; with a buffer of 12 the pointer finds them from a distance.",
  section: "Point Layer",
  tags: ['PointLayer', 'options', 'pickingBuffer', 'mousemove'],
  docs: ['repo/site/docs/api/point_layer/options.en.md', 'repo/site/docs/api/common/layer/options.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
