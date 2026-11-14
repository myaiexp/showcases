// Tone.js example: OnePoleFilter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A filter with a soft slope',
  summary:
    'A OnePoleFilter is the gentlest filter there is, falling off by only 6 dB per octave. Compare its curve with the dashed steeper Tone.Filter: it shades the tone instead of chopping it.',
  section: 'Filters',
  tags: ['OnePoleFilter', 'frequency', 'type', 'lowpass', 'highpass', 'getFrequencyResponse'],
  docs: ['repo/Tone/component/filter/OnePoleFilter.ts', 'repo/Tone/component/filter/Filter.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
