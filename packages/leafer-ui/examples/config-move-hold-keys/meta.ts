// leafer-ui example: Config move: hold keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config move: hold keys",
  summary:
    "move.holdSpaceKey, holdMiddleKey and holdRightKey let you pan by dragging while holding the space bar, pressing the middle button or the right button, without leaving element dragging on. Space and middle are on by default; right is off. The card right-drags.",
  section: "App & engine config",
  tags: ['Leafer', 'move', 'holdSpaceKey', 'holdMiddleKey', 'holdRightKey', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/move.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
