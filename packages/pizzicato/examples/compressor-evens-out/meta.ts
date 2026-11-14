// Pizzicato.js example: Compressor evening out loud and quiet notes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loud and quiet, evened out',
  summary:
    'Notes alternate between shouting and whispering. A Compressor squashes everything above its `threshold` and the output is lifted back up, so the gap between loud and quiet shrinks. The loudness bar shows the difference, off and on.',
  section: 'Effects',
  tags: ['Compressor', 'threshold', 'knee', 'ratio', 'attack', 'release'],
  docs: ['repo/README.md', 'repo/src/Effects/Compressor.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
