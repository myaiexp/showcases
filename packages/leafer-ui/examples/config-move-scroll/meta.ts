// leafer-ui example: Config move: scroll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config move: scroll",
  summary:
    "move.scroll constrains panning: true allows one direction at a time, \"x\" or \"y\" locks to an axis, and the limit forms (also \"x-limit\", \"y-limit\") keep the content in view like a document. The card scrolls diagonally under each setting in turn.",
  section: "App & engine config",
  tags: ['Leafer', 'move', 'scroll', 'limit', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/move.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
