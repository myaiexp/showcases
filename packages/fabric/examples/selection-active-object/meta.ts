// fabric example: Selection: set, get and discard the active object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: set, get and discard the active object',
  summary:
    'canvas.setActiveObject() selects an object from code, getActiveObject() and getActiveObjects() read the selection and discardActiveObject() clears it. None of them repaint, so requestRenderAll() follows.',
  section: 'Selection',
  tags: ['setActiveObject', 'getActiveObject', 'getActiveObjects', 'discardActiveObject', 'requestRenderAll'],
  docs: [
    'repo/src/content/docs/docs/Old docs/v2-breaking-changes.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
