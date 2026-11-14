// Pizzicato.js example: a playable keyboard with one wave sound per key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A toy keyboard',
  summary:
    'One wave sound per key, each tuned to its note: press a key with the pointer, or the letters A to K on your keyboard, and play() starts the note; letting go calls stop(). The card plays Twinkle, Twinkle for you.',
  section: 'Using sounds',
  tags: ['Sound', 'play', 'stop', 'frequency', 'wave', 'release'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
