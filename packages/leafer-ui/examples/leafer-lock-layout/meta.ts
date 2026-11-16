// leafer-ui example: Leafer: lockLayout and unlockLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Leafer: lockLayout and unlockLayout",
  summary:
    "lockLayout() pauses layout updates and unlockLayout() applies them once: wrap a batch of changes between them. Here 600 rects rotate about one world point, locked or not, and the time for the whole batch is printed.",
  section: "App & Engine",
  tags: ['Leafer', 'lockLayout', 'unlockLayout', 'rotateOf', 'getInnerPoint'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/display/Leafer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
