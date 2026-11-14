// Tone.js example: Filter rolloff
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gentle slope or steep cliff',
  summary:
    'Every filter has a cutoff, but how fast it cuts above that point is the rolloff. Tone.Filter stacks filters for -12, -24, -48 or -96 dB per octave: the steeper it is, the more the hi-hats vanish.',
  section: 'Filters',
  tags: ['Filter', 'rolloff', 'lowpass', 'getFrequencyResponse'],
  docs: ['repo/Tone/component/filter/Filter.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
