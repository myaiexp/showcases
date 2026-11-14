// Pizzicato.js example: a band of three recordings played with one Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A band in one group',
  summary:
    'Drums, bass and keys are three separate recordings, yet one group.play() starts them together and one group.stop() ends them. Each track keeps its own volume, so you can mix the band while it plays.',
  section: 'Grouping sounds',
  tags: ['Group', 'play', 'stop', 'file', 'loop', 'volume'],
  docs: ['repo/README.md', 'repo/src/Group.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
