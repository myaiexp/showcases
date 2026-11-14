// Tone.js example: MidSideCompressor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compress the middle and the sides of a mix apart',
  summary:
    'A MidSideCompressor splits stereo sound into what is the same in both speakers (mid) and what differs (side), and compresses each on its own. Squash the centre and the drums shrink; squash the sides and the wide chord and melody do.',
  section: 'Dynamics',
  tags: ['MidSideCompressor', 'mid', 'side', 'Compressor', 'Panner'],
  docs: ['repo/Tone/component/dynamics/MidSideCompressor.ts', 'repo/Tone/component/dynamics/Compressor.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
