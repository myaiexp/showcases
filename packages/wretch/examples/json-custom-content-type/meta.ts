// json-custom-content-type example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "JSON with a custom content type",
  summary:
    "Some servers want JSON under a special label such as application/vnd.api+json. The second argument of .json() sets it; the server refuses the default label and accepts the custom one.",
  section: "Body types",
  tags: ["json", "content-type"],
  docs: ["repo/src/types.ts", "repo/src/core.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
