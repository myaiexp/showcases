// Sortable.js example: delay with a chosen-state highlight on a photo grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Photo grid that needs a long press',
  summary:
    'Like a phone gallery: press and hold a photo until it glows, then drag it. A quick swipe never grabs anything, so scrolling stays easy. A slider changes the wait.',
  section: 'Dragging rules',
  tags: ['delay', 'chosenClass', 'onChoose', 'option()'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
