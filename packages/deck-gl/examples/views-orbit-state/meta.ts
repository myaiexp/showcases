// deck-gl example: OrbitView view state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "OrbitView view state",
  summary:
    "Sliders for rotationX, rotationOrbit, zoom and target in an OrbitView with minRotationX, maxRotationX, minZoom and maxZoom set; dragging updates the readout.",
  section: "Views",
  tags: ["OrbitView", "rotationX", "rotationOrbit", "target", "minRotationX"],
  docs: ["repo/docs/api-reference/core/orbit-view.md", "repo/docs/developer-guide/views.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
