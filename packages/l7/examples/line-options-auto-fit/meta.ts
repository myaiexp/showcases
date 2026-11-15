// l7 example: Layer option autoFit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option autoFit",
  summary:
    "With autoFit: true the map zooms to the layer's extent once the layer is initialised, wherever the camera started. The card re-adds the layer every few seconds.",
  section: "Line Layer",
  tags: ["options","autoFit"],
  docs: ["repo/site/docs/api/line_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
