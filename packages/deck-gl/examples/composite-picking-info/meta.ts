// deck-gl example: Picking info of composite layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Picking info of composite layers",
  summary:
    "Hovering a GeoJsonLayer of countries: info.layer is the composite layer while info.sourceLayer is the sublayer that drew the pixel.",
  section: "Interactivity",
  tags: ["PickingInfo", "sourceLayer", "CompositeLayer", "GeoJsonLayer"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/layers/geojson-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
