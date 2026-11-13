// mermaid example: Gantt task clicks: links and callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gantt task clicks: links and callbacks',
  summary:
    'click taskId href opens a URL and click taskId call runs a page function with arguments or the task id; securityLevel is raised to loose for the full view only.',
  section: 'Gantt',
  tags: ['gantt', 'click', 'href', 'callback', 'securityLevel'],
  docs: ['repo/packages/mermaid/src/docs/syntax/gantt.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
