// Tone.js example: BiquadFilter shelves and peaking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Boost the bass, cut the middle',
  summary:
    'Some BiquadFilter types do not remove anything: they turn a region up or down by a gain in decibels. A lowshelf lifts the bass, a highshelf the treble, and a peaking filter bumps or scoops a band.',
  section: 'Filters',
  tags: ['BiquadFilter', 'type', 'gain', 'lowshelf', 'highshelf', 'peaking', 'getFrequencyResponse'],
  docs: ['repo/Tone/component/filter/BiquadFilter.ts', 'repo/Tone/component/filter/Filter.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
