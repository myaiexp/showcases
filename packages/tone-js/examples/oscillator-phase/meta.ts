// Tone.js example: Two waves that cancel to silence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two waves that cancel to silence',
  summary:
    "Two sine waves of the same pitch add up when their peaks line up and vanish when one is shifted by half a cycle. A Tone.Oscillator's phase turns that shift into a knob, which is how you get thick or thin sounds from stacked tones.",
  section: 'Sources',
  tags: ['Oscillator', 'phase'],
  docs: ['repo/Sources.md', 'repo/Tone/source/oscillator/Oscillator.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
