// Tone.js example: A metronome with no Transport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A metronome with no Transport',
  summary:
    'Tone.Clock is a plain ticker: give it a frequency and a callback and it calls you on time, counting ticks, without involving the Transport. Here it steps through four notes at 2, 4 or 8 ticks a second.',
  section: 'Transport',
  tags: ['Clock', 'frequency', 'ticks', 'start', 'stop'],
  docs: [
    'repo/Tone/core/clock/Clock.ts',
    'repo/Tone/core/clock/Ticker.ts',
    'repo/Transport.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
