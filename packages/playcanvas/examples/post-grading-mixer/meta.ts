// playcanvas example: CameraFrame grading and channel mixer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame grading and channel mixer',
  summary:
    'The grading effect adjusts brightness, contrast, saturation and tint in linear HDR before tone mapping, and its channel mixer (mixerRed, mixerGreen, mixerBlue) builds each output channel from weighted input channels: identity, a red and blue swap, black and white from shared weights, or a green cast. The card steps through the presets.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'grading.enabled', 'grading.brightness', 'grading.contrast', 'grading.saturation', 'grading.tint', 'grading.mixerRed', 'grading.mixerGreen', 'grading.mixerBlue'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
