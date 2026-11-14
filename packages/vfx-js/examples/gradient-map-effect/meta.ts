// VFX-JS example: GradientMapEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GradientMapEffect',
  summary:
    'A landscape recoloured by brightness: GradientMapEffect looks each pixel\'s luminance up on a gradient of 2 to 8 hex colour stops. offset slides the lookup, scatter adds random jitter and speed animates the offset (the card runs at 0.15).',
  section: '@vfx-js/effects',
  tags: ['GradientMapEffect', 'effect', 'colors', 'offset', 'scatter', 'speed', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/gradient-map.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
