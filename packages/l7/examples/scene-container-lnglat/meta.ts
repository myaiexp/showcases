// l7 example: containerToLngLat and lngLatToContainer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "containerToLngLat and lngLatToContainer",
  summary:
    "lngLatToContainer places an HTML tag on a city in container pixels and keeps it there as the map moves; containerToLngLat turns the pointer's pixel position back into a coordinate.",
  section: 'Scene',
  tags: ["containerToLngLat", "lngLatToContainer", "mapmove", "mousemove"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
