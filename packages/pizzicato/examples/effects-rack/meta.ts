// Pizzicato.js example: a drone with four switchable effects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Effects rack',
  summary:
    'A steady drone with four effects you can patch in and out while it plays. addEffect() inserts one into the chain, removeEffect() pulls it back out.',
  section: 'Basics',
  tags: ['Effects', 'addEffect', 'Delay', 'Distortion', 'Tremolo', 'LowPassFilter'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
  audio: true,
});
