// Tone.js example: Amplitude modulation sidebands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Amplitude modulation sidebands',
  summary:
    "Tone.AMOscillator multiplies one wave by another, so its loudness follows the modulator. At audio speed this adds new pitches either side of the original: a ring-mod, bell-like colour whose harmonicity ratio you can change.",
  section: 'Sources',
  tags: ['AMOscillator', 'harmonicity', 'modulationType'],
  docs: ['repo/Sources.md', 'repo/Tone/source/oscillator/AMOscillator.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
