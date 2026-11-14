// Tone.js example: Shimmering pulse width modulation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shimmering pulse width modulation',
  summary:
    "A Tone.PWMOscillator makes a pulse wave and slowly sweeps its width, which gives a moving, chorused shimmer from a single oscillator. The modulationFrequency sets how fast the sweep runs, from a lazy wobble to a fast buzz.",
  section: 'Sources',
  tags: ['PWMOscillator', 'modulationFrequency'],
  docs: ['repo/Sources.md', 'repo/Tone/source/oscillator/PWMOscillator.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
