// VFX-JS example: HalftoneEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'HalftoneEffect',
  summary:
    'A portrait as a screen of coloured dots. In its default rgb mode HalftoneEffect draws a red, a green and a blue dot grid whose dot sizes follow each channel. gridSize, dotSize, smoothing and angle are read every frame.',
  section: '@vfx-js/effects',
  tags: ['HalftoneEffect', 'effect', 'rgb', 'gridSize', 'dotSize', 'smoothing', 'angle', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/halftone.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
