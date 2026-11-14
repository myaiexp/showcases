// Pizzicato.js example: a file sound made from a path string alone
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play a file from just its path',
  summary:
    "When all you need is the file, skip the description object: pass the path as a string, then a callback for when it is ready. new Pizzicato.Sound('./audio/sound.wav', callback) does the same as the source: 'file' form.",
  section: 'Create a sound',
  tags: ['Sound', 'path string', 'shorthand', 'callback'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
