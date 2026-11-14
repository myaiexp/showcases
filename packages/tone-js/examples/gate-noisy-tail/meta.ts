// Tone.js example: Gate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Silence the hiss between hits',
  summary:
    'A Gate lets sound through only while it is louder than a threshold. Under this drum loop runs a constant hiss: with the gate open you hear it all the time, with the threshold set above it the gaps go quiet.',
  section: 'Dynamics',
  tags: ['Gate', 'threshold', 'smoothing', 'Noise'],
  docs: ['repo/Tone/component/dynamics/Gate.ts', 'repo/Tone/source/Noise.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
