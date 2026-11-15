// l7 example: Layer options visible and name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer options visible and name",
  summary:
    "name labels a layer so scene.getLayerByName() can find it again; visible: false starts it hidden, and show()/hide() flip it.",
  section: "Line Layer",
  tags: ["options","name","visible","getLayerByName","show","hide"],
  docs: ["repo/site/docs/api/line_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
