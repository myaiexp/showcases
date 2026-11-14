// Pizzicato.js example: a sound made with no description at all
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The default sound',
  summary:
    'Make a Sound with nothing in the constructor and you get a plain sine wave at 440 Hz: the A note an orchestra tunes to. The card lights that key; in the full view a slider retunes the running sound.',
  section: 'Create a sound',
  tags: ['Sound', 'new Pizzicato.Sound()', 'default', 'frequency'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
