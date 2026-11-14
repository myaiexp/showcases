// Pizzicato.js example: pause() keeps the place, play() carries on from it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pause and resume',
  summary:
    'pause() freezes a sound where it is, and the next play() carries on from that very spot, like the pause button on a music player. Watch the playhead stop in the middle of the scale and then move on from there.',
  section: 'Using sounds',
  tags: ['Sound', 'pause', 'play', 'paused'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
