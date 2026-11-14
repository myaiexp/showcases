// Pizzicato.js example: the microphone as a sound source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Microphone input',
  summary:
    "With source: 'input' Pizzicato opens the computer's microphone (or line-in) as a Sound, so you hear yourself through the speakers. The full view asks for the microphone only when you press the button; use headphones. The card plays a recorded voice instead.",
  section: 'Create a sound',
  tags: ['Sound', "source: 'input'", 'microphone', 'callback', 'volume'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
