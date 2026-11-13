// Tone.js example: an eight-step sequencer driven by the Transport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Step sequencer',
  summary:
    'Toggle steps to program a loop, then press play. A Tone.Sequence walks the steps in time with the Transport, firing a note on each active one. Drag the tempo to change the BPM.',
  section: 'Basics',
  tags: ['Sequence', 'Transport', 'PolySynth', 'Draw'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
  audio: true,
});
