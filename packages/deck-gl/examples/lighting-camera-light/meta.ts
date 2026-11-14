// deck-gl example: CameraLight follows the viewer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraLight follows the viewer',
  summary:
    "The experimental _CameraLight is a point light at the camera position, so whatever faces you is lit and the light turns with the view. Orbit with the bearing slider, or drag, and compare with a fixed DirectionalLight.",
  section: 'Effects and lighting',
  tags: ['_CameraLight', 'CameraLight', 'DirectionalLight', 'LightingEffect', 'bearing'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/lighting-effect.md',
    'repo/docs/api-reference/core/camera-light.md',
    'repo/docs/api-reference/core/directional-light.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
