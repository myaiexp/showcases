// tone-js example: Stack effects one after another
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack effects one after another',
  summary:
    'Tone.chain connects nodes in a row, so a synth riff passes through a distortion, then a chorus, then a reverb. Each variant adds one more link; order matters because every effect hears the one before it.',
  section: 'Effects',
  tags: ['chain', 'Distortion', 'Chorus', 'Reverb', 'ready'],
  docs: ['repo/Connections.md', 'repo/Effects.md', 'repo/Tone/effect/Distortion.ts', 'repo/Tone/effect/Chorus.ts', 'repo/Tone/effect/Reverb.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
