// postprocessing example: GlitchEffect ratio between strong and weak glitches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glitch: ratio',
  summary:
    'During a SPORADIC burst each frame draws a random number and is a strong glitch when it beats ratio, otherwise a weak one. The JSDoc calls the value a threshold for strong glitches, so it is inverted: 0 gives all strong frames and 1 all weak ones. CONSTANT modes ignore it.',
  section: 'Glitch',
  tags: ['GlitchEffect', 'ratio', 'strength', 'GlitchMode.SPORADIC'],
  docs: ['repo/README.md', 'repo/src/effects/GlitchEffect.js', 'repo/src/enums/GlitchMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
