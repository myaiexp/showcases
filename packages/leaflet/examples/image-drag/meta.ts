// leaflet example: DomUtil.disableImageDrag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DomUtil.disableImageDrag",
  summary:
    `Dragging an image starts the browser's own drag-and-drop, which would fight a map drag. DomUtil.disableImageDrag cancels every dragstart on the window, and enableImageDrag undoes it; Leaflet's Draggable calls the pair around each drag. A dragstart is sent to a marker icon and the log reports whether it was cancelled.`,
  section: "Utilities & DOM",
  tags: ["DomUtil.disableImageDrag", "DomUtil.enableImageDrag", "dragstart", "Marker"],
  docs: ["repo/src/dom/DomUtil.js", "repo/src/dom/Draggable.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
