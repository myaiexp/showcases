// l7 example: Layer option: name and visible
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option: name and visible",
  summary:
    "name lets scene.getLayerByName() fetch a layer later; visible: false adds it hidden. The button looks the layer up by its name and shows or hides it.",
  section: "Point Layer",
  tags: ['PointLayer', 'options', 'name', 'visible', 'getLayerByName', 'show', 'hide'],
  docs: ['repo/site/docs/api/point_layer/options.en.md', 'repo/site/docs/api/common/layer/options.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
