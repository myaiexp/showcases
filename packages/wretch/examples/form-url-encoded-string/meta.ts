// form-url-encoded-string: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Send an already-encoded form",
  summary:
    "Give .formUrl() a string and it is sent exactly as written, skipping the conversion. Two requests side by side show when it matches what an object produces and when the spelling differs.",
  section: 'Addons',
  tags: ["formUrl", "FormUrlAddon"],
  docs: ["repo/README.md", "repo/src/addons/formUrl.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
