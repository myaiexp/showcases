// Pizzicato.js example: pausing, resuming and stopping a whole Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pause, resume and stop a group',
  summary:
    'group.pause() freezes every track where it is and group.play() carries on from the same spot, like a tape deck. group.stop() throws the place away and starts over. The lamps follow the group’s play, pause and stop events.',
  section: 'Grouping sounds',
  tags: ['Group', 'pause', 'play', 'stop', 'on'],
  docs: ['repo/README.md', 'repo/src/Group.js', 'repo/src/Events.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
