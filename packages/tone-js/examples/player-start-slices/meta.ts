// Tone.js example: Rearrange a recording in slices
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rearrange a recording in slices',
  summary:
    "Tone.Player.start takes a start time, an offset into the recording and a duration, so one recording can be played in pieces and in any order. Here eight notes are replayed backwards, shuffled or stuttering; tap the pads to fire a slice yourself.",
  section: 'Sources',
  tags: ['Player', 'start', 'offset', 'duration'],
  docs: ['repo/Sources.md', 'repo/Tone/source/buffer/Player.ts', 'repo/Tone/source/Source.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
