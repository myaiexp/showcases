// VFX-JS example: WarpEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'WarpEffect',
  summary:
    'A test card twisted around a centre. WarpEffect\'s twist type turns the picture more the closer it is to centerX and centerY; amplitude sets how much and in which direction.',
  section: '@vfx-js/effects',
  tags: ['WarpEffect', 'effect', 'type', 'amplitude', 'centerX', 'centerY', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/warp.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
