// postprocessing example: getViewZ and PERSPECTIVE_CAMERA with two camera types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: perspective and orthographic depth',
  summary:
    'A DEPTH effect stripes the scene every few units of view distance using `getViewZ(depth)`. The EffectPass reads the camera it was constructed with, defines PERSPECTIVE_CAMERA for a perspective one and fills `cameraNear`/`cameraFar`, so the same shader is right for both camera types. Warm bands mark perspective, cool bands orthographic.',
  section: 'Custom effects',
  tags: ['Effect', 'EffectAttribute', 'DEPTH', 'getViewZ', 'PERSPECTIVE_CAMERA', 'cameraNear', 'cameraFar', 'EffectPass'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/materials/EffectMaterial.js', 'repo/src/enums/EffectAttribute.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
