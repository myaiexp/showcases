// leafer-ui example: Data: input and computed data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: input and computed data",
  summary:
    "The input data holds only what you set (get('width') is undefined until then), rect.width falls back to the default, and the computed data in __ is the final value.",
  section: "Data",
  tags: ["get","__","width"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/data.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
