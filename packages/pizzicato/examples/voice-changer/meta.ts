// Pizzicato.js example: a microphone voice through effects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Voice changer',
  summary:
    "Plug a voice into an effect and it becomes someone else: a RingModulator makes a robot, a Reverb a cave, a high-pass and low-pass pair an old telephone. The full view uses your microphone (headphones, please) and swaps effects while you talk; the card uses a recorded voice.",
  section: 'Create a sound',
  tags: ['Sound', "source: 'input'", 'RingModulator', 'Reverb', 'HighPassFilter', 'LowPassFilter', 'addEffect'],
  docs: ['repo/README.md', 'repo/src/Sound.js', 'repo/src/Effects/RingModulator.js', 'repo/src/Effects/Reverb.js', 'repo/src/Effects/Filters.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
