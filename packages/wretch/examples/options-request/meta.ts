// options-request example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ask what the server allows",
  summary:
    ".opts() sends an OPTIONS request; the Allow header in the answer lists the methods an address accepts, lit up as chips.",
  section: "HTTP methods",
  tags: ["opts", "res"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
