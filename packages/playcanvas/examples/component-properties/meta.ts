// playcanvas example: Reading and changing component properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reading and changing component properties",
  summary: "A lamp's light component is configured at creation and changed afterwards through plain properties: intensity, range and a colour that is replaced, not edited, when it changes.",
  section: "Entity Component System",
  tags: ["light.intensity","light.range","light.color","Color"],
  docs: ["repo/docs/user-manual/ecs/components.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
