// Tone.js example: Snare, hat and whoosh from noise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Snare, hat and whoosh from noise',
  summary:
    'Noise has no pitch, so its envelope does all the work: a short burst is a snare or hat, a slow swell is a whoosh. Tone.NoiseSynth also picks the noise colour: white, pink or brown.',
  section: 'Instruments',
  tags: ['NoiseSynth', 'noise.type', 'envelope', 'triggerAttackRelease'],
  docs: ['repo/Tone/instrument/NoiseSynth.ts', 'repo/Instruments.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
