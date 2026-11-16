// fabric example: Controls: Anatomy of a Control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: Anatomy of a Control',
  summary:
    "A Control is a position (x, y as fractions of the box, plus offsetX and offsetY in pixels), a size, an action handler, a cursor and an optional connection line. Sliders reshape one added to a Rect.",
  section: 'Controls',
  tags: ['Control','controls','x','y','offsetX','offsetY','sizeX','sizeY','withConnection','actionName','cursorStyle','actionHandler','setCoords'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/classes/Control.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/scalingEqually.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
