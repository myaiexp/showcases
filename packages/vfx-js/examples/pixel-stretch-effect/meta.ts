// VFX-JS example: PixelStretchEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PixelStretchEffect',
  summary:
    'One line of a portrait is smeared across a band, like a stuck scanner. PixelStretchEffect takes offset (where the line is), reach (the band\'s size), smoothness (soft edges) and angle (the stretch direction).',
  section: '@vfx-js/effects',
  tags: ['PixelStretchEffect', 'effect', 'offset', 'reach', 'smoothness', 'angle', 'centerX', 'centerY', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/pixel-stretch.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
