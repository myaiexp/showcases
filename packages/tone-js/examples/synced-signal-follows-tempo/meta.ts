// Tone.js example: Tune written on the Transport grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tune written on the Transport grid',
  summary:
    'A SyncedSignal takes its values at bars and beats of the Transport instead of seconds, so the same eight-note tune plays faster or slower with the BPM, and stops with the Transport.',
  section: 'Signals',
  tags: ['SyncedSignal', 'Transport', 'setValueAtTime', 'bpm'],
  docs: ['repo/Signals.md', 'repo/Tone/signal/Signal.ts', 'repo/Tone/signal/SyncedSignal.ts', 'repo/Transport.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
