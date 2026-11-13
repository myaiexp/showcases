// babylon-js example: reflection probe on a sphere
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reflection probe on a sphere',
  summary:
    'A ReflectionProbe attached to a sphere renders five orbiting spheres and a checkered room into a cube texture every frame, and that cube texture is the sphere\'s reflectionTexture. Buttons change the probe\'s refreshRate, including the render-once freeze.',
  section: 'Environment',
  tags: ['ReflectionProbe', 'probe.renderList', 'attachToMesh', 'cubeTexture', 'refreshRate', 'RenderTargetTexture'],
  docs: ['repo/content/features/featuresDeepDive/environment/reflectionProbes.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
