// leafer-ui example: Data: export trim
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: export trim",
  summary:
    "trim: true cuts the transparent pixels from the export, so only the painted circle in the corner of the Box remains. The result and its trimBounds are shown.",
  section: "Data",
  tags: ["export","trim","trimBounds"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/export.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
