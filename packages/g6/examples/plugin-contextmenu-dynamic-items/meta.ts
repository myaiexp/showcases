// g6 example: Contextmenu: items by target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Contextmenu: items by target',
  summary: 'getItems reads the event, so a node gets Delete Node, an edge gets Move Edge and the canvas gets no items.',
  section: 'Plugin',
  tags: ['contextmenu', 'getItems', 'event.target'],
  docs: ['repo/packages/site/docs/manual/plugin/Contextmenu.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
