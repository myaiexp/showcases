// Tone.js example: Fade a recording in and out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fade a recording in and out',
  summary:
    "A Tone.Player's fadeIn and fadeOut ramp the volume at the start and the stop, so a clip begins gently or trails away instead of starting and cutting off hard. The shaded stretches mark the fades.",
  section: 'Sources',
  tags: ['Player', 'fadeIn', 'fadeOut', 'start'],
  docs: ['repo/Sources.md', 'repo/Tone/source/buffer/Player.ts', 'repo/Tone/source/OneShotSource.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
