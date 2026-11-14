// Tone.js example: Thick drone from detuned copies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Thick drone from detuned copies',
  summary:
    "Tone.FatOscillator plays several copies of one wave, each tuned a little differently. The copies drift in and out of step, so a single held note thickens into a slow, shimmering chorus. count is how many copies, spread how far apart.",
  section: 'Sources',
  tags: ['FatOscillator', 'count', 'spread'],
  docs: ['repo/Sources.md', 'repo/Tone/source/oscillator/FatOscillator.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
