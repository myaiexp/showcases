// Pizzicato.js example: the release property sets how slowly a note fades out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Release: fade a note out',
  summary:
    'When you stop() a sound with a bigger release, it fades away instead of cutting off, like a piano pedal held down. The card stops the same note three times, with three release values, and a loudness bar follows the tail.',
  section: 'Using sounds',
  tags: ['Sound', 'release', 'stop'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
