// g6 example: API event: node dblclick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: node dblclick",
  summary:
    "NodeEvent.DBLCLICK logs the node that was double-clicked, after the two NodeEvent.CLICK events of the same gesture; the node lights up.",
  section: 'API',
  tags: ['NodeEvent.DBLCLICK', 'NodeEvent.CLICK'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
