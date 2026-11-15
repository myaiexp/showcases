// vega example: Custom Encode Sets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom Encode Sets",
  summary:
    "Pressing a bar runs its \"select\" set and releasing runs \"release\": two sets with names the marks page allows, invoked by an encode directive in a signal handler.",
  section: "Marks",
  tags: ['marks.encode','signal.on.encode'],
  docs: ['repo/docs/docs/marks.md', 'repo/docs/docs/types.md', 'repo/docs/docs/signals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
