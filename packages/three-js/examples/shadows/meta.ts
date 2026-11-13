// Three.js example: castShadow, receiveShadow and the directional light's shadow camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadow-casting lights',
  summary:
    'A DirectionalLight casts shadows from a cube and a bobbing sphere onto a floor. Its shadow camera is drawn with a CameraHelper, and controls change the shadow map type and size, the camera extent and the blur radius.',
  section: 'Fundamentals',
  tags: ['castShadow', 'receiveShadow', 'DirectionalLight', 'LightShadow', 'shadowMap', 'CameraHelper'],
  docs: [
    'repo/manual/pages/shadows.html',
    'repo/docs/pages/LightShadow.html.md',
    'repo/docs/pages/DirectionalLightShadow.html.md',
    'repo/docs/pages/DirectionalLightHelper.html.md',
    'repo/docs/pages/CameraHelper.html.md',
    'repo/docs/pages/global.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
