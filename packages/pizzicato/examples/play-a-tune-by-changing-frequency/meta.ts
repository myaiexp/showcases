// Pizzicato.js example: one wave sound retuned note by note through its frequency property
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play a tune on one sound',
  summary:
    'A single wave sound plays a whole melody: before each note, set its frequency property to the pitch you want. The keys light up as the tune moves along, and the reading shows the frequency being set.',
  section: 'Using sounds',
  tags: ['Sound', 'frequency', 'wave', 'play', 'stop'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
