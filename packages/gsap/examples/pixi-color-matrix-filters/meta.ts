// gsap example: PixiPlugin saturation, hue, brightness, colorize, contrast, blur and colorMatrixFilter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PixiPlugin color matrix filters',
  summary:
    'Eight tiles show the same Pixi-drawn landscape under different pixi properties: saturation, hue, brightness, colorize, contrast, blurX/blurY, a custom sepia ColorMatrixFilter, and a timeline stepping through several.',
  section: 'Pixi',
  tags: ['PixiPlugin', 'ColorMatrixFilter', 'BlurFilter', 'saturation', 'hue', 'colorize', 'brightness'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/PixiPlugin.md',
    'pages/gsap-com/docs/v3/Plugins/PixiPlugin/static-registerPIXI-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
