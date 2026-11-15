// cobe example: Draggable recipe with a hand-written spring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable globe',
  summary:
    'Dragging the globe sideways turns it by the drag distance divided by 200 radians; on release a small spring carries it back. The card replays a pull and release on its own. The spring is hand-written because the docs use react-spring.',
  section: 'Recipes',
  tags: ['phi', 'update'],
  docs: ['repo/website/app/components/Recipes.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});
