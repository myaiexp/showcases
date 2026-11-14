// Tone.js example: a step sequencer grid driven by Tone.Sequence and the Transport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Step sequencer',
  summary:
    'Click cells to write a loop: each column is a sixteenth note, each row a pitch. A Tone.Sequence walks the columns in time with the Transport and plays whatever is switched on. Drag the tempo to speed it up.',
  section: 'Events',
  tags: ['Sequence', 'Transport', 'PolySynth', 'bpm', 'Draw'],
  docs: [
    'repo/Events.md',
    'repo/Transport.md',
    'repo/Tone/event/Sequence.ts',
    'repo/Tone/instrument/PolySynth.ts',
    'repo/Tone/core/util/Draw.ts',
  ],
  provenance: 'pure',
  added: '2026-06-14',
});
