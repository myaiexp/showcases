// Pizzicato.js example: three sounds in a Group, played as one chord
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play a chord with a group',
  summary:
    'A Group holds several sounds and plays, stops or pauses them together. Three triangle waves (C, E and G) go into new Pizzicato.Group([...]), and one play() sounds the whole chord.',
  section: 'Grouping sounds',
  tags: ['Group', 'play', 'stop'],
  docs: ['repo/README.md', 'repo/src/Group.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
