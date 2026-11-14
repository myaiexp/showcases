// fetch-any-method example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Send any method with .fetch()",
  summary:
    ".fetch(method, url, body) sends any method you name, including PURGE, which has no shortcut. PATCH, DELETE and PURGE requests go to a simulated server.",
  section: "HTTP methods",
  tags: ["fetch", "patch", "delete"],
  docs: ["repo/src/types.ts", "repo/src/core.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
