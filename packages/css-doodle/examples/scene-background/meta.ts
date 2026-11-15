// A scene as a background: fixed images, one per cell
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A scene as a background: fixed images, one per cell",
  summary: "As a background a scene is encoded into an image, which is fine for a still model but slow for a moving one. Each cell of a 3 × 3 grid has its own background scene with a random turn and a color from a list.",
  section: "Scenes",
  tags: ["@scene", "background", "@r", "@p"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
