// form-data-with-a-file: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Upload a file with other fields",
  summary:
    "A File placed in the object goes out as a file part beside the text fields. Cards send files made in code; in the full view open or drop your own (it never leaves the page).",
  section: 'Addons',
  tags: ["formData", "File", "multipart"],
  docs: ["repo/src/addons/formData.ts", "repo/RECIPES.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
