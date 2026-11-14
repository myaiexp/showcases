// Pizzicato.js example: a LowPassFilter's frequency and peak moved over time for a wah sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Wah-wah filter sweep',
  summary:
    'Open and close a LowPassFilter while a buzzy note holds: the sound goes from muffled to bright and back, a classic synth "wow". `peak` adds a whistle at the cutoff, which is what makes it wah-wah. The sweep is just the `frequency` property set again and again.',
  section: 'Effects',
  tags: ['LowPassFilter', 'frequency', 'peak', 'sweep'],
  docs: ['repo/README.md', 'repo/src/Effects/Filters.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
