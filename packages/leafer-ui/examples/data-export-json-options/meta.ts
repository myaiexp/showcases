// leafer-ui example: Data: export json
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: export json",
  summary:
    "export('json', { json: { matrix } }) returns the element's JSON as data, with the transform matrix when asked. The result is printed as text.",
  section: "Data",
  tags: ["export","json","matrix"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/export.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
