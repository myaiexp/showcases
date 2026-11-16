// leafer-ui example: Config: type "block"
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: type \"block\"",
  summary:
    "The default type, block, makes the canvas behave like a block element in the page: it scrolls with the document and, on touch screens, a drag that grabs nothing scrolls the page. Here a tall canvas sits under a line of text inside a scrolling box.",
  section: "App & engine config",
  tags: ['Leafer', 'type', 'block', 'view', 'height'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/type.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
