// Pizzicato.js example: the bufferSize option of a script sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Script buffer size',
  summary:
    "A script sound is computed in blocks. bufferSize sets how many samples go in each block: small blocks mean your function is called very often and reacts quickly (low latency), big blocks mean fewer calls and fewer glitches. The card counts the calls for 256, 1024 and 4096.",
  section: 'Create a sound',
  tags: ['Sound', "source: 'script'", 'bufferSize', 'audioFunction', 'latency'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
