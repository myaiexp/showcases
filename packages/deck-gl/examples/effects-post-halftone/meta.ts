// deck-gl example: stylising shader passes as PostProcessEffects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PostProcessEffect: halftone, pixelate and ink',
  summary:
    "The fun filters exported by @luma.gl/effects (colorHalftone, dotScreen, hexagonalPixelate, ink) applied to a map as PostProcessEffects. A select swaps the module and a slider sets the dot size, hexagon width or ink strength.",
  section: 'Effects and lighting',
  tags: ['PostProcessEffect', 'colorHalftone', 'dotScreen', 'hexagonalPixelate', 'ink', '@luma.gl/effects'],
  docs: [
    'repo/docs/api-reference/core/post-process-effect.md',
    'repo/docs/developer-guide/using-effects.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
