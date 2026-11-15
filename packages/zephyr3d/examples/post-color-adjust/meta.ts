// zephyr3d example: Colour adjustment: saturation, contrast, hue, sharpen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colour adjustment: saturation, contrast, hue, sharpen',
  summary:
    'camera.colorAdjust enables the ColorAdjust effect on the camera. Saturation and contrast are multipliers (1 leaves the image alone), hue rotates in degrees and sharpen adds an unsharp pass.',
  section: 'Post-processing',
  tags: ['colorAdjust', 'colorAdjustSaturation', 'colorAdjustContrast', 'colorAdjustHue', 'colorAdjustSharpen'],
  docs: ['repo/apps/doc/web/en/posteffect-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
