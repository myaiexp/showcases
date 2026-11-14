// Pizzicato.js example: on('play' | 'pause' | 'stop') runs your code when the sound changes state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Know when a sound plays, pauses or stops',
  summary:
    'A sound announces what happens to it: sound.on("play", fn) calls your function every time it starts, and likewise for "pause" and "stop". Each lamp lights when its event arrives, which is how a page keeps a play button or a progress display in step.',
  section: 'Using sounds',
  tags: ['Sound', 'on', 'play', 'pause', 'stop', 'events'],
  docs: ['repo/README.md', 'repo/src/Sound.js', 'repo/src/Events.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
