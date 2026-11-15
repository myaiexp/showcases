// l7 example: Drag events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Drag events",
  summary:
    "Dragging the map fires dragstart, a stream of dragging events and dragend, each with the pointer's lngLat.",
  section: 'Scene',
  tags: ["dragstart", "dragging", "dragend"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
