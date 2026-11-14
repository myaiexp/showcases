// Pizzicato.js example: a wave's type and frequency, the two options of a wave sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tone generator',
  summary:
    "A sound from a wave takes a type (sine, square, triangle or sawtooth) and a frequency. The type sets the tone's colour, from a pure whistle to a bright buzz; the frequency sets the pitch, and changing it on a playing sound retunes it in place.",
  section: 'Create a sound',
  tags: ['Sound', "source: 'wave'", 'type', 'frequency'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-06-14',
});
