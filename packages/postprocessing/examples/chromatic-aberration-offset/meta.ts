// postprocessing example: ChromaticAberrationEffect offset in x and y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chromatic aberration: offset',
  summary:
    'ChromaticAberrationEffect samples the red channel one way and the blue channel the opposite way along its offset, in UV units, so bright glowing edges grow red and blue fringes. The sliders move the offset on each axis; cards sweep it round in a circle.',
  section: 'Glitch',
  tags: ['ChromaticAberrationEffect', 'offset', 'Vector2'],
  docs: ['repo/README.md', 'repo/src/effects/ChromaticAberrationEffect.js', 'repo/src/effects/glsl/chromatic-aberration.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
