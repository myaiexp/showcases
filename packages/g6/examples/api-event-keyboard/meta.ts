// g6 example: API event: keyboard events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: keyboard events",
  summary:
    "ContainerEvent keydown and keyup are logged with the key and code; the graph container takes focus on click.",
  section: 'API',
  tags: ['ContainerEvent.KEY_DOWN', 'ContainerEvent.KEY_UP'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
