// polygon: a @shape outline given depth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "polygon: a @shape outline given depth",
  summary: "polygon takes a @shape body as its outline, holes and all, and gives it a depth. The outline is in the units of @shape. The variants extrude a heart, a star and a hexagon.",
  section: "Scenes",
  tags: ["@scene", "polygon", "depth", "@shape"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
