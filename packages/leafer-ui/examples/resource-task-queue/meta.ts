// leafer-ui example: Resource: tasker and queue
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Resource: tasker and queue",
  summary: "Resource.tasker runs async tasks in parallel (export() waits for them) and Resource.queue runs them one at a time so heavy work does not block rendering. Three tasks go to each; the chart shows when each ran.",
  section: "Utilities",
  tags: ["Resource", "tasker", "queue", "TaskProcessor", "add"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/resource/Resource.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
