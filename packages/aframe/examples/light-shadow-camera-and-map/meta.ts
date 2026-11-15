// aframe example: light: shadow camera frustum, map size and bias
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light: shadow camera frustum, map size and bias",
  summary: "shadowCameraVisible draws the light's shadow camera so its frustum can be seen: objects outside it cast no shadow. Sliders set the frustum size (shadowCameraLeft/Right/Top/Bottom) and the shadow map resolution, which sharpens or pixelates the shadow edge.",
  section: 'Components',
  tags: ["light", "shadowCameraVisible", "shadowCameraLeft", "shadowCameraRight", "shadowCameraTop", "shadowCameraBottom", "shadowMapWidth", "shadowMapHeight", "shadowBias"],
  docs: ["repo/docs/components/light.md", "repo/docs/components/shadow.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
