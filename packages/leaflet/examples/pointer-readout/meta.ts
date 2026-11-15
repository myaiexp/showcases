// leaflet example: pointer-readout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pointer coordinates",
  summary:
    "Shows what a pointermove event carries: latlng, containerPoint and layerPoint, plus pointerEventToLatLng in the full view. Dragging the map shows the layer point staying fixed while the container point changes. The card moves a fake pointer.",
  section: "Map events & conversion",
  tags: ["pointermove", "pointerout", "latlng", "containerPoint", "layerPoint", "pointerEventToLatLng"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
