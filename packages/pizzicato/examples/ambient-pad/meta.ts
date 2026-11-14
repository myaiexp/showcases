// Pizzicato.js example: a slow ambient pad made of a Group of detuned sawtooths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ambient pad',
  summary:
    'Ten sawtooth waves, two per note and slightly out of tune with each other, sit in one Group. Slow attack and release fade the chord in and out, and a LowPassFilter and a Reverb on the group turn the buzz into a soft pad.',
  section: 'Grouping sounds',
  tags: ['Group', 'sawtooth', 'attack', 'release', 'LowPassFilter', 'Reverb', 'frequency'],
  docs: ['repo/README.md', 'repo/src/Group.js', 'repo/src/Sound.js', 'repo/src/Effects/Reverb.js', 'repo/src/Effects/Filters.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
