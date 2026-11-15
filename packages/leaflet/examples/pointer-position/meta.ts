// leaflet example: DomEvent.getPointerPosition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DomEvent.getPointerPosition",
  summary:
    `DomEvent.getPointerPosition(e) returns the pointer's page position (clientX, clientY), and with a container it returns the position inside that container, border excluded. The map has a thick orange border so the difference shows: at the inner top-left corner the container position is 0, 0 while the page position is not, and it matches the map's own containerPoint.`,
  section: "Utilities & DOM",
  tags: ["DomEvent.getPointerPosition", "pointermove", "containerPoint", "LeafletMap"],
  docs: ['repo/src/dom/DomEvent.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
