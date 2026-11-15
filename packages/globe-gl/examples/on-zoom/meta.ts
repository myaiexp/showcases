// globe-gl example: Render: onZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: onZoom",
  summary:
    "onZoom fires whenever the orbit controls move the camera, by dragging, scrolling or auto-rotation, and receives the new { lat, lng, altitude }. The readout counts the calls and shows the latest point of view.",
  section: "Render Control",
  tags: ["onZoom", "pointOfView", "controls"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
