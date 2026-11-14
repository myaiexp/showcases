// Tone.js example: sweeping a filter cutoff over time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sweep a filter open and shut',
  summary:
    'Ramping the frequency of a Tone.Filter over a couple of seconds is the classic synth move: a dull riff opens up into a bright one, or a bright riff chokes down. The curve slides with it.',
  section: 'Filters',
  tags: ['Filter', 'frequency', 'exponentialRampTo', 'lowpass', 'highpass', 'Q'],
  docs: ['repo/Tone/component/filter/Filter.ts', 'repo/Signals.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
