// Tone.js example: One control, pitch and pan together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One control, pitch and pan together',
  summary:
    'A single Signal fans out through two Scale nodes: one sets a tone\'s pitch, the other its place between the speakers, so one number moves both. Listen with headphones.',
  section: 'Signals',
  tags: ['Signal', 'Scale', 'Panner', 'connect'],
  docs: ['repo/Signals.md', 'repo/Tone/signal/Signal.ts', 'repo/Tone/signal/Scale.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
