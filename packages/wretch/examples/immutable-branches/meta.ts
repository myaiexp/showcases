// immutable-branches example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Every call makes a new client",
  summary:
    "Adding a header to a client does not change that client: it returns a new one. A base client and two branches each send a request, and only the branches carry their own language.",
  section: "Helper methods",
  tags: ["headers", "immutability"],
  docs: ["repo/README.md", "repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
