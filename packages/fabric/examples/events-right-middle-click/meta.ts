// fabric example: Events: right and middle click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: right and middle click',
  summary:
    'Since v7 the canvas fires mouse:down and mouse:up for the right and middle buttons and stops the browser context menu by default. Toggle fireRightClick, fireMiddleClick and stopContextMenu and click with each button.',
  section: 'Events',
  tags: ['fireRightClick', 'fireMiddleClick', 'stopContextMenu', 'contextmenu', 'mouse:down', 'mouse:up'],
  docs: [
    'repo/CHANGELOG.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
    'repo/src/content/docs/api/interfaces/MiscEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
