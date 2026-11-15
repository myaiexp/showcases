// beforeUpdate: keep a history of seeds and step back through it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Seed history with beforeUpdate',
  summary:
    'The beforeUpdate event fires synchronously at the start of every update, while the outgoing picture\'s seed is still readable, so pushing doodle.seed there builds a history. Back pops a seed and sets it, which redraws that exact picture. The card goes forward three times, then back.',
  section: 'Events',
  tags: ['beforeUpdate', 'seed', 'update()'],
  docs: ['pages/css-doodle-com/reference/event-beforeupdate.md', 'pages/css-doodle-com/reference/js-api-seed.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
