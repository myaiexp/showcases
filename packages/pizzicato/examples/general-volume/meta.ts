// Pizzicato.js example: Pizzicato.volume as a master volume for every sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'General volume',
  summary:
    'Pizzicato.volume is one fader for everything Pizzicato plays, whether the sounds are in a group or not. Three separate recordings fade down and back up together while each sound’s own volume stays put.',
  section: 'Advanced',
  tags: ['Pizzicato.volume', 'volume', 'file', 'loop'],
  docs: ['repo/README.md', 'repo/src/Pizzicato.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
