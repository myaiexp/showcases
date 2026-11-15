// A fill that reads light: toon bands, shadows too
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A fill that reads light: toon bands, shadows too",
  summary: "A fill that reads light, how much light reaches the point, does its own lighting, and the scene leaves it as it is. Rounding light down with floor(light * 4) / 4 paints four flat bands, shadows included.",
  section: "Scenes",
  tags: ["@scene", "fill", "light", "shadow", "mix"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
