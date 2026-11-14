// accept-header example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ask for a format with .accept()",
  summary:
    ".accept() tells the server which format you want. The same product list comes back as JSON (shown as a table), CSV text or an HTML snippet depending on what you ask for.",
  section: "Helper methods",
  tags: ["accept", "headers", "res"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
