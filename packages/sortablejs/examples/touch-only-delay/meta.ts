// Sortable.js example: delayOnTouchOnly keeps the wait for fingers, not mice
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Instant for mouse, patient for touch',
  summary:
    'A reminder list that a mouse can rearrange at once, while a finger has to hold for half a second so scrolling does not move things by accident. Compare with a list that makes everyone wait.',
  section: 'Dragging rules',
  tags: ['delay', 'delayOnTouchOnly'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
