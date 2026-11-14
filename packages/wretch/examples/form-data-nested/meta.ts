// form-data-nested: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Nested objects as form fields",
  summary:
    "A form is flat, so nested objects need flattening. With { recursive: true } the duck example becomes duckProperties[beak][color]; without it the inner objects arrive as the useless text [object Object].",
  section: 'Addons',
  tags: ["formData", "recursive"],
  docs: ["repo/README.md", "repo/src/addons/formData.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
