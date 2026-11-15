// zephyr3d example: Motion blur strength and shutter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Motion blur strength and shutter',
  summary:
    'A spinning propeller and racing balls under camera.motionBlur. Strength scales the blur, shutterBias moves the streak behind or ahead of the object, and motionBlurMaxLength caps it.',
  section: 'Post-processing',
  tags: ['motionBlur', 'motionBlurStrength', 'motionBlurShutterBias', 'motionBlurMaxLength'],
  docs: ['repo/apps/doc/web/en/posteffect-motionblur.md', 'repo/apps/doc/web/en/posteffect-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
