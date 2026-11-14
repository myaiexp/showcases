// Tone.js example: ramp an oscillator's frequency signal from C4 down to C2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Slide a tone down two octaves',
  summary:
    "An oscillator's frequency is a signal, so it can glide smoothly instead of jumping: rampTo slides middle C down to C2 over two seconds. Watch the wave stretch out as the pitch falls.",
  section: 'Getting started',
  tags: ['Oscillator', 'frequency', 'Signal', 'rampTo'],
  docs: ['repo/README.md', 'repo/Signals.md', 'repo/Tone/source/oscillator/Oscillator.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
