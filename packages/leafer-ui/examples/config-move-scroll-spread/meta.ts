// leafer-ui example: Config move: scrollSpread
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config move: scrollSpread",
  summary:
    "With a limit scroll mode the view cannot leave the content; move.scrollSpread widens that boundary on each side ([top, right, bottom, left]; 20 means all four). Pan past the content to see the margin.",
  section: "App & engine config",
  tags: ['Leafer', 'move', 'scroll', 'scrollSpread', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/move.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
