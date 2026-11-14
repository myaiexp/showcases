// Tone.js example: MultibandCompressor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Squash only the bass, or only the highs',
  summary:
    'A MultibandCompressor splits the sound at two crossover frequencies and runs a separate Compressor on the low, mid and high parts. Tame just the kick or just the hats and leave the rest alone.',
  section: 'Dynamics',
  tags: ['MultibandCompressor', 'low', 'mid', 'high', 'lowFrequency', 'highFrequency', 'threshold', 'ratio'],
  docs: ['repo/Tone/component/dynamics/MultibandCompressor.ts', 'repo/Tone/component/dynamics/Compressor.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
