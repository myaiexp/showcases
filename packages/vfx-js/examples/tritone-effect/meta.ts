// VFX-JS example: TritoneEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TritoneEffect',
  summary:
    'A flower bed mapped onto three colours: shadows, midtones and highlights take color1, color2 and color3 (all [r, g, b, a] in 0..1). speed cycles the mapping over time; the card runs it at 0.3.',
  section: '@vfx-js/effects',
  tags: ['TritoneEffect', 'effect', 'color1', 'color2', 'color3', 'speed', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/tritone.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
