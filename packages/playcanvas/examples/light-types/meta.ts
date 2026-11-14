// playcanvas example: Directional, omni and spot lights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Directional, omni and spot lights",
  summary:
    "One light entity cycles through the three light types over a ring of shapes, circling and aiming with lookAt plus a quarter turn, because lights shine along their negative Y axis. The full view sets intensity, range, cone angles and shadows.",
  section: "Graphics: Lighting",
  tags: ["LightComponent","type","range","innerConeAngle","outerConeAngle","lookAt","rotateLocal"],
  docs: ["repo/docs/user-manual/graphics/lighting/lights.md","repo/docs/user-manual/graphics/lighting/index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
