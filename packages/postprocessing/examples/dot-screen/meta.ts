// postprocessing example: DotScreenEffect halftone with angle and scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot screen: angle and scale',
  summary:
    'DotScreenEffect turns the picture into a halftone of coloured dots. angle (radians) rotates the dot lattice and scale sets how fine it is; the card sweeps both.',
  section: 'Pattern',
  tags: ['DotScreenEffect', 'angle', 'scale'],
  docs: ['repo/README.md', 'repo/src/effects/DotScreenEffect.js', 'repo/src/effects/glsl/dot-screen.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
