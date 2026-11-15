// light: none leaves fill as the final color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light: none leaves fill as the final color",
  summary: "light: none turns the lighting off, so fill is the final color, and a fill that reads light then sees 1. The variants compare the lit torus with the unshaded one and with a dimmer light given as a number.",
  section: "Scenes",
  tags: ["@scene", "light", "torus"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
