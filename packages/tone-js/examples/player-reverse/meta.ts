// Tone.js example: Play a recording backwards
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play a recording backwards',
  summary:
    "Setting reverse on a Tone.Player flips the recording end to start. A gong that normally strikes and fades now swells up from nothing and stops dead, the classic reverse-cymbal build-up.",
  section: 'Sources',
  tags: ['Player', 'reverse', 'ToneAudioBuffer'],
  docs: ['repo/Sources.md', 'repo/Tone/source/buffer/Player.ts', 'repo/Tone/core/context/ToneAudioBuffer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
