// leafer-ui example: Canvas: toJSON turns pixels into a URL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas: toJSON turns pixels into a URL",
  summary:
    "Exporting a Canvas to JSON stores its bitmap as a base64 url, and importing restores it by loading that image. The caption shows the url length and the clone loaded from the JSON.",
  section: "Elements",
  tags: ['Canvas', 'toJSON', 'ready', 'ImageEvent'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
