// fabric example: Events: mouse over highlights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: mouse over highlights',
  summary:
    'mouse:over and mouse:out hand over the object the pointer entered or left, so a few lines of set() make shapes light up, grow and cast a Shadow while hovered. hoverCursor changes the pointer shown over them.',
  section: 'Events',
  tags: ['mouse:over', 'mouse:out', 'hoverCursor', 'Shadow', 'set'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md',
    'repo/CHANGELOG.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
