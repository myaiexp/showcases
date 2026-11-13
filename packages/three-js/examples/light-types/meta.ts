// Three.js example: the six light types with their helpers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Every light type',
  summary:
    'Switch between AmbientLight, HemisphereLight, DirectionalLight, PointLight, SpotLight and RectAreaLight and see each one light the same scene, drawn with its helper. RectAreaLight is wired up for WebGPU with RectAreaLightNode.setLTC.',
  section: 'Fundamentals',
  tags: ['AmbientLight', 'HemisphereLight', 'DirectionalLight', 'PointLight', 'SpotLight', 'RectAreaLight', 'helpers'],
  docs: [
    'repo/manual/pages/lights.html',
    'repo/docs/pages/RectAreaLight.html.md',
    'repo/docs/pages/RectAreaLightNode.html.md',
    'repo/docs/pages/RectAreaLightTexturesLib.html.md',
    'repo/docs/pages/RectAreaLightHelper.html.md',
    'repo/docs/pages/RectAreaLightUniformsLib.html.md',
    'repo/docs/pages/SpotLightHelper.html.md',
    'repo/docs/pages/HemisphereLightHelper.html.md',
    'repo/docs/pages/PointLightHelper.html.md',
    'repo/docs/pages/DirectionalLightHelper.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
