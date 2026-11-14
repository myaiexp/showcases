// factory-base-options example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A base address and options in one call",
  summary:
    "wretch(BASE, { cache, credentials }) sets the address and fetch options once. Three different requests go out and each one shows the same cache and credentials arriving, without repeating them.",
  section: "Helper methods",
  tags: ["wretch()", "options", "base client"],
  docs: ["repo/README.md", "repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
