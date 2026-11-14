// babylon-js example: Motion blur post-process
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Motion blur post-process',
  summary:
    'A MotionBlurPostProcess on the camera blurs a spinning fan and a bouncing ball by their per-object velocity, while a still box stays sharp. motionStrength scales the smear and motionBlurSamples trades quality for speed; turning isObjectBased off switches to screen-based blur from camera motion only.',
  section: 'Post Processes',
  tags: ['MotionBlurPostProcess', 'motionStrength', 'motionBlurSamples', 'isObjectBased'],
  docs: ['repo/content/features/featuresDeepDive/postProcesses/motionBlurPostProcess.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
