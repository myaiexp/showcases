// json-body example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Send JSON with .json()",
  summary:
    ".json(object).post() and .post(object) produce the same request: JSON text plus a content type. Two envelopes side by side show they match.",
  section: "Body types",
  tags: ["json", "post"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
