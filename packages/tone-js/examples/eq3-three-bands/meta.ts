// Tone.js example: the EQ3 equaliser
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bass, mid and treble knobs',
  summary:
    'EQ3 splits a sound into low, mid and high and gives each its own gain in decibels, like the tone controls on a stereo. Turn the bass up for a heavier beat, scoop the mids for a hollow one.',
  section: 'Filters',
  tags: ['EQ3', 'low', 'mid', 'high', 'lowFrequency', 'highFrequency'],
  docs: ['repo/Tone/component/filter/EQ3.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
