// VFX-JS example: GlitchEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GlitchEffect',
  summary:
    'Blocks of a night city jump sideways and the colour channels drift apart in short bursts. GlitchEffect has two params: speed (time scale) and intensity (scales the shifts and the aberration), both read every frame.',
  section: '@vfx-js/effects',
  tags: ['GlitchEffect', 'effect', 'speed', 'intensity', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/glitch.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
