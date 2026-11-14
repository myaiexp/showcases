// Tone.js example: Slow down without lowering the pitch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Slow down without lowering the pitch',
  summary:
    "A Tone.Player slowed to half speed also drops an octave, like a record. A Tone.GrainPlayer cuts the recording into tiny grains, so it can change speed and pitch separately: stretch time at the same pitch, or shift pitch at the same speed.",
  section: 'Sources',
  tags: ['GrainPlayer', 'playbackRate', 'detune', 'Player'],
  docs: ['repo/Sources.md', 'repo/Tone/source/buffer/GrainPlayer.ts', 'repo/Tone/source/buffer/Player.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
