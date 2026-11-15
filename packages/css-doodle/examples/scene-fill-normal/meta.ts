// fill reads normal: color from the surface direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "fill reads normal: color from the surface direction",
  summary: "fill can read normal, the surface normal as the camera sees it, with x to the right, y up and z toward the camera. .5 + .5 * normal turns direction into color, and the camera turning shows the colors follow the view.",
  section: "Scenes",
  tags: ["@scene", "fill", "normal", "box"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
