// form-data-object: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A form from an object",
  summary:
    ".formData() turns a plain object into the multipart form an HTML form would send. Your object sits next to the fields the server received, with numbers and true/false turned into text.",
  section: 'Addons',
  tags: ["formData", "FormDataAddon", "multipart"],
  docs: ["repo/README.md", "repo/src/addons/formData.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
