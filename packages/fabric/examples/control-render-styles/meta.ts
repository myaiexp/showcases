// fabric example: Controls: Circle and square control renderers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: Circle and square control renderers',
  summary:
    "cornerStyle chooses renderCircleControl or renderSquareControl for every handler; assigning a renderer to a single Control's render lets circles and squares mix on one object. Size and fill options change both.",
  section: 'Controls',
  tags: ['cornerStyle','renderCircleControl','renderSquareControl','cornerSize','cornerColor','transparentCorners','cornerStrokeColor','Control'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/renderCircleControl.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/renderSquareControl.md', 'repo/src/content/docs/api/classes/Control.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
