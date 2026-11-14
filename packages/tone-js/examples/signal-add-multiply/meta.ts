// Tone.js example: Vibrato size and centre from Multiply and Add
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vibrato size and centre from Multiply and Add',
  summary:
    'A -1 to 1 wave times a depth, plus a base pitch, makes vibrato of any size around any note. Multiply sets how far it swings, Add where it is centred.',
  section: 'Signals',
  tags: ['Multiply', 'Add', 'LFO', 'chain'],
  docs: ['repo/Signals.md', 'repo/Tone/signal/Signal.ts', 'repo/Tone/signal/Multiply.ts', 'repo/Tone/signal/Add.ts', 'repo/Tone/source/oscillator/LFO.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
