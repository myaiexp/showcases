// l7 example: removeAllLayer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "removeAllLayer",
  summary:
    "One awaited call removes and destroys every layer, the basemap layers included; the layer count drops to 0 and the layers are built again.",
  section: 'Scene',
  tags: ["removeAllLayer", "getLayers"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
