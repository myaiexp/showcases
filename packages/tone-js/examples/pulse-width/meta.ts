// Tone.js example: Pulse wave: thin to hollow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pulse wave: thin to hollow',
  summary:
    "A Tone.PulseOscillator is a square wave whose width you can change. At the middle it is hollow like a square; as the pulse gets thinner the tone turns nasal and reedy, the classic chiptune lead sound.",
  section: 'Sources',
  tags: ['PulseOscillator', 'width'],
  docs: ['repo/Sources.md', 'repo/Tone/source/oscillator/PulseOscillator.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
