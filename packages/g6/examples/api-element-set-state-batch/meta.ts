// g6 example: API element: setElementState with a map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API element: setElementState with a map",
  summary:
    "setElementState takes an id-to-state map for nodes and edges in one call and resolves when the states are applied; the time is shown.",
  section: 'API',
  tags: ['setElementState', 'Record<ID, State>'],
  docs: ['repo/packages/site/docs/api/element.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
