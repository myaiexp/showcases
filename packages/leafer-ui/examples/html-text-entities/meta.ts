// leafer-ui example: HTMLText: built-in HTML entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HTMLText: built-in HTML entities",
  summary:
    "SVG cannot show HTML entities such as &copy;, so decodeText() turns the common ones into Unicode first. This text uses a dozen of the built-in ones.",
  section: "Official plugins",
  tags: ["HTMLText", "@leafer-in/html", "decodeText", "entities"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/html.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
