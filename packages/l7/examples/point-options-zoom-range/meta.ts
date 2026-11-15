// l7 example: Layer option: minZoom and maxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option: minZoom and maxZoom",
  summary:
    "The orange layer shows only between zoom 3 and 4 and the blue one only above 4: zoom with the slider and watch them swap.",
  section: "Point Layer",
  tags: ['PointLayer', 'options', 'minZoom', 'maxZoom', 'zoom'],
  docs: ['repo/site/docs/api/point_layer/options.en.md', 'repo/site/docs/api/common/layer/options.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
