// fabric example: Events: isClick and alreadySelected
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: isClick and alreadySelected',
  summary:
    'mouse:up carries isClick (true for a click, false after a drag) and mouse:down carries alreadySelected. The mouse:down:before and mouse:up:before events fire ahead of fabric\'s own handling.',
  section: 'Events',
  tags: ['mouse:down:before', 'mouse:down', 'mouse:up:before', 'mouse:up', 'isClick', 'alreadySelected'],
  docs: [
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
    'repo/src/content/docs/api/interfaces/TPointerEventInfo.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
