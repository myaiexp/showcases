// postprocessing example: linking GlitchEffect to a ChromaticAberrationEffect offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glitch with chromatic aberration',
  summary:
    'Giving GlitchEffect the offset Vector2 of a ChromaticAberrationEffect lets the glitch drive the colour split: the red and blue channels slide apart in a random direction while it glitches and snap back when it stops. Unlinked, the split stays at a fixed offset.',
  section: 'Glitch',
  tags: ['GlitchEffect', 'chromaticAberrationOffset', 'ChromaticAberrationEffect', 'offset', 'EffectPass'],
  docs: ['repo/src/effects/GlitchEffect.js', 'repo/src/effects/ChromaticAberrationEffect.js', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
