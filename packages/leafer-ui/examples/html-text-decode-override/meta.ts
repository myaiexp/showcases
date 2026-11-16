// leafer-ui example: HTMLText: override decodeText
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HTMLText: override decodeText",
  summary:
    "decodeText can be replaced to decode every HTML entity: here with the browser itself, as the docs do with the entities package. The original is put back on cleanup.",
  section: "Official plugins",
  tags: ["HTMLText", "@leafer-in/html", "decodeText"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/html.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
