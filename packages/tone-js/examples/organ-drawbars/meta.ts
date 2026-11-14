// Tone.js example: Organ tones from drawbars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Organ tones from drawbars',
  summary:
    "An oscillator's partials list sets the volume of each harmonic, like the drawbars of a church organ. Push up the odd ones for a hollow reed, only the first for a flute. One Tone.Oscillator with type \"custom\" makes them all.",
  section: 'Sources',
  tags: ['Oscillator', 'partials', 'custom'],
  docs: ['repo/Sources.md', 'repo/Tone/source/oscillator/Oscillator.ts', 'repo/Tone/source/oscillator/OscillatorInterface.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
