// Pizzicato.js example: a live-editable oscillator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tone generator',
  summary:
    'A single oscillator you can shape live. Pick a waveform and sweep the frequency; Pizzicato updates the running sound in place, no restart needed.',
  section: 'Basics',
  tags: ['Sound', 'wave', 'frequency', 'volume'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
  audio: true,
});
