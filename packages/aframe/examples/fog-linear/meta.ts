// aframe example: fog: linear fog with near, far and color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "fog: linear fog with near, far and color",
  summary: "Linear fog grows denser between near and far: a corridor of pillars fades into the fog colour with distance, nothing closer than near is touched, and nothing beyond far is clearer than the fog colour. Sliders change near and far on the scene's fog component, and the card breathes them.",
  section: 'Components',
  tags: ["fog", "type: linear", "near", "far", "color", "scene"],
  docs: ["repo/docs/components/fog.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
