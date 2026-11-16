// aframe example: componentchanged: listen for changes to an entity's components
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'componentchanged: listen for changes to an entity\'s components',
  summary:
    'An animated box fires componentchanged as its position changes; the listener checks evt.detail.name and reads the new position. The event is throttled, so it suits logging, not smooth reads.',
  section: 'Core API',
  tags: ['componentchanged', 'detail.name', 'position', 'animation'],
  docs: ['repo/docs/core/entity.md', 'repo/docs/components/animation.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
