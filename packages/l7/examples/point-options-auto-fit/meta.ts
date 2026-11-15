// l7 example: Layer option: autoFit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option: autoFit",
  summary:
    "The map starts looking at the Atlantic; autoFit moves it to the layer's extent as soon as the layer has initialised, here a handful of Pacific cities.",
  section: "Point Layer",
  tags: ['PointLayer', 'options', 'autoFit'],
  docs: ['repo/site/docs/api/point_layer/options.en.md', 'repo/site/docs/api/common/layer/options.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
