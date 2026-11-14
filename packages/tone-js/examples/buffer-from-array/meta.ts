// Tone.js example: A sound computed in code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A sound computed in code',
  summary:
    "ToneAudioBuffer.fromArray makes a recording out of a list of numbers, so a sound can be calculated instead of loaded. This one draws a half-second pitch sweep with a loop of maths and a Tone.Player fires it as a laser zap.",
  section: 'Sources',
  tags: ['ToneAudioBuffer', 'fromArray', 'Player', 'getChannelData'],
  docs: ['repo/Sources.md', 'repo/Tone/core/context/ToneAudioBuffer.ts', 'repo/Tone/source/buffer/Player.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
