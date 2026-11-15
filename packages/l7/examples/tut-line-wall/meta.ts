// l7 example: Wall: a geofence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Wall: a geofence",
  summary:
    "shape('wall') gives a line a height (size) so it becomes a geofence. sourceColor to targetColor fades from the ground up; the card orbits the map.",
  section: "Tutorial: Line",
  tags: ["shape","wall","size","sourceColor","targetColor","pitch"],
  docs: ["repo/site/docs/tutorial/line/wall.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
