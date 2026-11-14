// playcanvas example: Custom CameraFrame effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom CameraFrame effect',
  summary:
    'A class derived from CameraFrameEffect contributes a shader chunk (GLSL and WGSL) to the single compose pass at COMPOSESLOT_LDR, here drawing the image as dots. Its parameters are copied into uniforms in update(), active drops the chunk at zero intensity, and addEffect or insertEffectBefore decides whether it runs before or after the built-in vignette.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrameEffect', 'COMPOSESLOT_LDR', 'CameraFrame.addEffect', 'CameraFrame.insertEffectBefore', 'CameraFrame.removeEffect', 'setUniform', 'active', 'sceneTextureSize'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/custom-effects.md', 'repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
