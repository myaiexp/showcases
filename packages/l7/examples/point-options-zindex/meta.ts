// l7 example: Layer option: zIndex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option: zIndex",
  summary:
    "Layers draw in zIndex order, larger on top, whatever order they were added in. The red circles are always added second; set the blue layer's zIndex above 0 to put it over them.",
  section: "Point Layer",
  tags: ['PointLayer', 'options', 'zIndex', 'setIndex'],
  docs: ['repo/site/docs/api/point_layer/options.en.md', 'repo/site/docs/api/common/layer/options.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
