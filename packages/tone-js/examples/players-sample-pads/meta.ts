// Tone.js example: A drum kit of named samples
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A drum kit of named samples',
  summary:
    "Tone.Players holds many recordings under names, so a drum kit or a sound-effects board is one object: players.player(\"kick\").start(). Tap the pads to fire a sound yourself, or watch two short beats play through the same kit.",
  section: 'Sources',
  tags: ['Players', 'player', 'stopAll', 'ToneAudioBuffer.slice'],
  docs: ['repo/Sources.md', 'repo/Tone/source/buffer/Players.ts', 'repo/Tone/core/context/ToneAudioBuffers.ts', 'repo/Tone/core/context/ToneAudioBuffer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
