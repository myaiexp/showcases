// VFX-JS example: ColoredEdgesEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ColoredEdgesEffect',
  summary:
    'Only the outlines of the flowers are left: ColoredEdgesEffect runs a Sobel edge detector and colours the edges with a gradient from color1 to color2 over a background colour. Colours are hex strings; opacity blends the source back in.',
  section: '@vfx-js/effects',
  tags: ['ColoredEdgesEffect', 'effect', 'threshold', 'thickness', 'opacity', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/colored-edges.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
