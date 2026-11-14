// The update events in order: beforeUpdate, render, update
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The order of update events',
  summary:
    'A log of the three update events. The first render dispatches only render; every update() then dispatches beforeUpdate synchronously at the start (the outgoing seed still readable), and render and update asynchronously, in that order, once the new styles are in place.',
  section: 'Events',
  tags: ['beforeUpdate', 'render', 'update', 'update()'],
  docs: ['pages/css-doodle-com/reference/event-beforeupdate.md', 'pages/css-doodle-com/reference/event-render.md', 'pages/css-doodle-com/reference/event-update.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
