// l7 example: Marker extData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker extData",
  summary:
    "extData stores your own object on a marker: setExtData replaces it and getExtData reads it; each label here counts its own clicks.",
  section: "Component",
  tags: ["Marker","extData","getExtData","setExtData","getElement"],
  docs: ["repo/site/docs/api/component/marker.en.md","repo/site/docs/api/component/marker_layer.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
