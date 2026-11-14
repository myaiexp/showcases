// url-replace example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Swap the base address",
  summary:
    "Passing true as the second argument of .url() replaces the address instead of adding to it. The same path is asked of two servers, and a box for each shows which one answered.",
  section: "Helper methods",
  tags: ["url", "replace"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
