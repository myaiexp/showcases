// leafer-ui example: SVG: recolour through a template
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: recolour through a template",
  summary:
    "To change an SVG image's colours, keep the SVG as a string with a variable and rebuild the url: here the badge background is a template colour fed to Platform.toURL.",
  section: "Elements",
  tags: ['Image', 'Platform', 'toURL', 'url'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/SVG.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
