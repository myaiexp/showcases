// options-merge example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Options pile up",
  summary:
    "Two .options() calls normally mix together, headers included. Passing true makes the second call replace the first. Two side-by-side lists show what the server actually received from each client.",
  section: "Helper methods",
  tags: ["options", "headers", "merge"],
  docs: ["repo/src/types.ts", "repo/src/core.ts", "repo/src/utils.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
