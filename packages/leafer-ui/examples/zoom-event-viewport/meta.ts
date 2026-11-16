// leafer-ui example: ZoomEvent: start, zoom and end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ZoomEvent: start, zoom and end",
  summary: "On a viewport leafer, Ctrl + wheel (or a pinch) fires zoom.start, zoom and zoom.end carrying scale and totalScale. The listener applies each step with LeafHelper.zoomOfWorld around the event point, like the docs' custom zoom.",
  section: "Events",
  tags: ["ZoomEvent.START", "ZoomEvent.ZOOM", "ZoomEvent.END", "scale", "totalScale", "LeafHelper.zoomOfWorld"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Zoom.md", "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
