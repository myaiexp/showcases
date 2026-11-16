// aframe example: Lifecycle handlers in order: init, update, play, tick, pause, remove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lifecycle handlers in order: init, update, play, tick, pause, remove',
  summary:
    'A component logs from each handler while a box spins in tick(). Changing a property calls update with the old data, pause() and play() hit the handlers, and removeAttribute calls remove. The board shows the order.',
  section: 'Core API',
  tags: ['init', 'update', 'play', 'tick', 'pause', 'remove', 'oldData'],
  docs: ['repo/docs/core/component.md', 'repo/docs/core/entity.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
