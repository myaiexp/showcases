// l7 example: Layer option: enablePropagation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option: enablePropagation",
  summary:
    "Mouse events normally stop at the top layer. With enablePropagation: true on it, a click on the overlap also reaches the layer below; the readout lists who heard it.",
  section: "Point Layer",
  tags: ['PointLayer', 'options', 'enablePropagation', 'click'],
  docs: ['repo/site/docs/api/point_layer/options.en.md', 'repo/site/docs/api/common/layer/options.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
