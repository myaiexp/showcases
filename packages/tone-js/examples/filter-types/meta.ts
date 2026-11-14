// Tone.js example: the basic filter types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Four filters that carve a drum loop',
  summary:
    'A Tone.Filter keeps some frequencies and removes others. The curve shows what gets through at each pitch, and the level bar and waveform show what is left of the beat: lowpass, highpass, bandpass or notch.',
  section: 'Filters',
  tags: ['Filter', 'type', 'frequency', 'lowpass', 'highpass', 'bandpass', 'notch', 'getFrequencyResponse'],
  docs: ['repo/Tone/component/filter/Filter.ts', 'repo/Tone/component/filter/BiquadFilter.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
