// form-url-object: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A URL-encoded form from an object",
  summary:
    ".formUrl() writes an object as an encoded string and sets the content type for you. Nested objects become JSON text, lists repeat the key, and special characters are escaped.",
  section: 'Addons',
  tags: ["formUrl", "FormUrlAddon", "urlencoded"],
  docs: ["repo/README.md", "repo/src/addons/formUrl.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
