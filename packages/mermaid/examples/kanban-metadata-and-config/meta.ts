// mermaid example: Kanban metadata keys and ticket links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Kanban metadata keys and ticket links",
  summary: "Each metadata key on its own (assigned, ticket, all four priority values), the ticketBaseUrl config that links tickets, and the full docs board.",
  section: "Kanban",
  tags: ["kanban","metadata","ticketBaseUrl","priority"],
  docs: ["repo/packages/mermaid/src/docs/syntax/kanban.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
