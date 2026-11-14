// playcanvas example: Splat shadows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Splats casting shadows onto a mesh',
  summary:
    'A gsplat component with castShadows and a directional light with castShadows throw the shadow of a splat torus knot onto a plane. The shadow quality is tuned with the scene-wide alphaClip, and because splats cannot receive shadows the ground is an ordinary lit mesh.',
  section: 'Gaussian Splatting',
  tags: ['GSplatComponent.castShadows', 'LightComponent.castShadows', 'GSplatParams.alphaClip', 'shadowDistance', 'directional light'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/shadows.md',
    'repo/docs/user-manual/editor/scenes/components/gsplat.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
