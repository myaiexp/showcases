// mermaid example: Kanban board with moving tasks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Kanban board with moving tasks',
  summary:
    'A kanban board whose tasks advance column by column on a timer, with assignee, ticket and priority metadata on each card. Restart replays the sprint.',
  section: 'Kanban',
  tags: ['kanban', 'columns', 'metadata', 'priority'],
  docs: ['repo/packages/mermaid/src/docs/syntax/kanban.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
