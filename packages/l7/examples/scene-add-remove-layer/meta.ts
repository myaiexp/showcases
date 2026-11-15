// l7 example: addLayer and removeLayer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "addLayer and removeLayer",
  summary:
    "Three named layers are added and removed in turn. getLayerByName finds a layer by the name given in its options, and removeLayer destroys it, so toggling back builds a new one.",
  section: 'Scene',
  tags: ["addLayer", "removeLayer", "getLayerByName", "getLayers", "name"],
  docs: ["repo/site/docs/api/scene.en.md", "repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
