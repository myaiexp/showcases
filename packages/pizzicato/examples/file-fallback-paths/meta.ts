// Pizzicato.js example: a file sound with several paths to fall back on
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'File fallback paths',
  summary:
    "Give a file sound an array of paths and Pizzicato tries them in order, moving on when one cannot be decoded: an unsupported format, a missing file. If every path fails, your callback receives the error instead of a sound.",
  section: 'Create a sound',
  tags: ['Sound', "source: 'file'", 'path', 'callback', 'error'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
