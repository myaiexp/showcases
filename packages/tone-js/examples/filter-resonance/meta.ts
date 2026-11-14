// Tone.js example: filter resonance (Q)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Make a filter ring',
  summary:
    'The Q of a Tone.Filter sharpens its cutoff into a peak. Low Q is a smooth fade, high Q emphasises the notes that sit on the cutoff so the riff gets that squelchy, whistling edge.',
  section: 'Filters',
  tags: ['Filter', 'Q', 'resonance', 'lowpass', 'getFrequencyResponse'],
  docs: ['repo/Tone/component/filter/Filter.ts', 'repo/Tone/component/filter/BiquadFilter.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
