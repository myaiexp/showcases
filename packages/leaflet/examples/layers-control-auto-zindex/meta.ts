// leaflet example: autoZIndex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "autoZIndex",
  summary:
    "autoZIndex on a LayersControl gives its tile layers rising zIndex values so switching one off and on keeps the stacking order. Turned off, the layer put back lands on top. A caption lists the zIndex values.",
  section: "Layer groups",
  tags: ["LayersControl", "autoZIndex", "zIndex", "setZIndex", "TileLayer"],
  docs: ["repo/src/control/LayersControl.js", "repo/src/layer/tile/TileLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
