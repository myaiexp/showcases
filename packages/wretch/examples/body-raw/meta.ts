// body-raw example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Send raw text with .body()",
  summary:
    ".body(\"hello\").put() and .put(\"hello\") send the very same request. Two envelopes side by side show what the server received from each, with a verdict that they match.",
  section: "Body types",
  tags: ["body", "put"],
  docs: ["repo/README.md", "repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
