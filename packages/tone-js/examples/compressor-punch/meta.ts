// Tone.js example: Compressor on a drum loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Squash a drum loop flat, or keep it punchy',
  summary:
    'A Compressor turns down whatever rises above its threshold, by the ratio you set. A fast, hard setting flattens the beat; a slower attack lets the first thump of each hit through. The level bar shows how much quieter it gets.',
  section: 'Dynamics',
  tags: ['Compressor', 'threshold', 'ratio', 'attack', 'release', 'knee'],
  docs: ['repo/Tone/component/dynamics/Compressor.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
