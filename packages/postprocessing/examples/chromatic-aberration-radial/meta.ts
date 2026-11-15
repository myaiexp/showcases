// postprocessing example: ChromaticAberrationEffect radialModulation and modulationOffset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chromatic aberration: radial modulation',
  summary:
    'With radialModulation on, the colour split fades toward the screen centre and grows toward the edges, like a real lens. modulationOffset is the distance from the centre (0 to 1, centre to corner-ish) where the split starts; raise it and more of the middle stays clean.',
  section: 'Glitch',
  tags: ['ChromaticAberrationEffect', 'radialModulation', 'modulationOffset', 'offset'],
  docs: ['repo/README.md', 'repo/src/effects/ChromaticAberrationEffect.js', 'repo/src/effects/glsl/chromatic-aberration.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
