// Tone.js example: Tone.Offline renders a phrase into a buffer, then a Player plays it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render sound without playing it',
  summary:
    'Tone.Offline runs Tone.js code silently and faster than real time, and hands back the result as an audio buffer: here a short arpeggio, drawn as a picture of the recording and then played back by a Player.',
  section: 'Context',
  tags: ['Offline', 'OfflineContext', 'ToneAudioBuffer', 'Player', 'toArray'],
  docs: [
    'repo/Tone/core/context/Offline.ts',
    'repo/Tone/core/context/OfflineContext.ts',
    'repo/Tone/core/context/ToneAudioBuffer.ts',
    'repo/Tone/source/buffer/Player.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
