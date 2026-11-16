// leafer-ui example: Data: JSON with the matrix option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: JSON with the matrix option",
  summary:
    "toJSON() and toString() take { matrix: true } to include the transform matrix with the other properties. The rotating rect's JSON is printed live.",
  section: "Data",
  tags: ["toString","toJSON","matrix"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/json.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
