// fabric example: Gotchas: setCoords after moving an object from code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gotchas: setCoords after moving an object from code',
  summary:
    'Two rectangles moved by code to a new spot. Click where you see them: the one that was only assigned left is still found at its old position, the one followed by setCoords() is selected. User drags refresh the coordinates for you; code does not.',
  section: 'Gotchas',
  tags: ['setCoords', 'aCoords', 'oCoords', 'mouse:down'],
  docs: [
    'repo/src/content/docs/docs/Old docs/gotchas.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
