// aframe example: light + shadow: a directional light casts shadows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light + shadow: a directional light casts shadows",
  summary: "The shadow recipe from the docs: a directional light with castShadow: true, the shadow component on the objects that cast and on the ground that receives, and shadowCameraAutomatic fitting the shadow camera around the shapes. A box and a sphere orbit so their shadows slide over the floor.",
  section: 'Components',
  tags: ["light", "castShadow", "shadow", "cast", "receive", "shadowCameraAutomatic", "directional"],
  docs: ["repo/docs/components/light.md", "repo/docs/components/shadow.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
