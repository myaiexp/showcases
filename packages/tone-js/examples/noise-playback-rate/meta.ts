// Tone.js example: Noise darkens when slowed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Noise darkens when slowed',
  summary:
    "A Tone.Noise is a looped buffer of random samples, so its playbackRate changes the colour: slow it down and the hiss sinks to a rumble, speed it up and it turns thin and bright. A cheap tone control for wind and surf.",
  section: 'Sources',
  tags: ['Noise', 'playbackRate'],
  docs: ['repo/Sources.md', 'repo/Tone/source/Noise.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
