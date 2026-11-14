// resolve-every-response example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Program what happens to every answer",
  summary:
    ".resolve() on the client turns every answer into JSON automatically, so awaiting api.get(...) gives the data itself with no .json() on each request.",
  section: "Helper methods",
  tags: ["resolve", "json"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
