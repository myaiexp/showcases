// l7 example: scene.map: the map engine
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scene.map: the map engine",
  summary:
    "scene.map is the underlying map instance, for methods L7 does not wrap. The built-in Map engine has flyTo, which zooms out and back in along the way between cities.",
  section: 'Map',
  tags: ["scene.map", "flyTo"],
  docs: ["repo/site/docs/api/common/map.en.md", "repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
