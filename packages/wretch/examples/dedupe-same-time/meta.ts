// Three identical calls, one request: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three identical calls, one request',
  summary:
    'Three parts of a page each ask for the same post while the first answer is still on its way. Without dedupe the server gets three requests; with dedupe() the later asks wait for the first and all three screens fill from one answer. Tick the box to compare.',
  section: 'Middlewares',
  tags: ['dedupe', 'middlewares', 'Promise.all'],
  docs: ['repo/README.md', 'repo/RECIPES.md', 'repo/src/middlewares/dedupe.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
