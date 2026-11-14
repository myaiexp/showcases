// Tone.js example: loop a recording with Tone.Player and change its playback rate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loop a recording',
  summary:
    'Tone.Player plays an audio file: here a two-second drum loop, looped forever. Its playback rate speeds the recording up or slows it down, and the pitch moves with it, like a turntable.',
  section: 'Sources',
  tags: ['Player', 'loop', 'playbackRate', 'ToneAudioBuffer'],
  docs: ['repo/README.md', 'repo/Sources.md', 'repo/Tone/source/buffer/Player.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
