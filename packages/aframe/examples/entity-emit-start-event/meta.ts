// aframe example: emit(): trigger an animation's startEvents and pass event detail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'emit(): trigger an animation\'s startEvents and pass event detail',
  summary:
    'entity.emit(\'rotate\') starts an animation waiting on startEvents: rotate, and emit(\'collide\', {target}) carries data in event.detail to a listener that reads it.',
  section: 'Core API',
  tags: ['emit', 'animation', 'startEvents', 'detail'],
  docs: ['repo/docs/core/entity.md', 'repo/docs/components/animation.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
