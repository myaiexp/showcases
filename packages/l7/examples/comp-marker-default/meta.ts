// l7 example: Marker default pin and color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker default pin and color",
  summary:
    "new Marker({ color }) with no element draws the default pin in that color; here one pin per place, recolored on demand.",
  section: "Component",
  tags: ["Marker","color","setLnglat","addMarker"],
  docs: ["repo/site/docs/api/component/marker.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
