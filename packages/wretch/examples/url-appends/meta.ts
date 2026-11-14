// url-appends example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Build an address piece by piece",
  summary:
    "Each .url() adds a piece to the address and returns a longer client. Watch the address bar grow to /api/blogs/42, then send it and see the blog come back.",
  section: "Helper methods",
  tags: ["url", "base client"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
