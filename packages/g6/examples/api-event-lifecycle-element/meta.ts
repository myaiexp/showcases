// g6 example: API event: element create, update and destroy events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: element create, update and destroy events",
  summary:
    "GraphEvent before and after events for element create, update and destroy, logged with elementType and id as nodes are added, changed and removed.",
  section: 'API',
  tags: ['GraphEvent.BEFORE_ELEMENT_CREATE', 'GraphEvent.AFTER_ELEMENT_UPDATE', 'GraphEvent.AFTER_ELEMENT_DESTROY', 'IElementLifeCycleEvent'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
