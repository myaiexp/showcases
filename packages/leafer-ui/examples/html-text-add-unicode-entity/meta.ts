// leafer-ui example: HTMLText: addUnicodeEntity with one entity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HTMLText: addUnicodeEntity with one entity",
  summary:
    "HTMLText.addUnicodeEntity('hearts', '\\u2665') teaches decodeText a name it lacks; &hearts; then renders as a heart. The map is page-wide and stays.",
  section: "Official plugins",
  tags: ["HTMLText", "@leafer-in/html", "addUnicodeEntity"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/html.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
