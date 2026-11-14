// VFX-JS example: DuotoneEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DuotoneEffect',
  summary:
    'A portrait mapped onto two colours: shadows take color1, highlights color2. Colours are [r, g, b, a] arrays in 0..1; speed cycles the mapping over time and 0 keeps it still.',
  section: '@vfx-js/effects',
  tags: ['DuotoneEffect', 'effect', 'color1', 'color2', 'speed', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/duotone.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
