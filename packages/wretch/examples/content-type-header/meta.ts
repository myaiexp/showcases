// content-type-header example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Say what you are sending with .content()",
  summary:
    ".content() labels the body you send. The same text is sent as text/plain and as application/json, and the server reads it as plain words in one case and as data in the other.",
  section: "Helper methods",
  tags: ["content", "headers", "post"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
