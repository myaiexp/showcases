// l7 example: Marker show, hide and remove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker show, hide and remove",
  summary:
    "hide() keeps a marker but stops drawing it, show() restores it, remove() takes it off the map and scene.addMarker puts it back.",
  section: "Component",
  tags: ["Marker","show","hide","remove","addMarker"],
  docs: ["repo/site/docs/api/component/marker.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
