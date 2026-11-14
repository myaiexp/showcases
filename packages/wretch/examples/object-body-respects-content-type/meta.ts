// object-body-respects-content-type example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "An object body follows the content type you set",
  summary:
    "An object passed to .post() becomes JSON only when no content type was set or it is JSON-like. Set text/plain first and the object reaches the server as the useless text \"[object Object]\".",
  section: "Body types",
  tags: ["post", "json", "content"],
  docs: ["repo/README.md", "repo/src/core.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
