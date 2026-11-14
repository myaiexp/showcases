// g6 example: API event: fields of the event object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: fields of the event object",
  summary:
    "A click on a node or the canvas logs the event's targetType, target, originalTarget, currentTarget, originalEvent and its coordinates.",
  section: 'API',
  tags: ['CommonEvent.CLICK', 'target', 'targetType', 'originalTarget', 'currentTarget', 'originalEvent', 'IPointerEvent'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
