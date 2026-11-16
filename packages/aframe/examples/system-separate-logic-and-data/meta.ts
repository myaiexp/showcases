// aframe example: System pattern: logic in the system, data in the component
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'System pattern: logic in the system, data in the component',
  summary:
    'The tower system builds a stack of boxes in createComplexObject; the tower component only keeps floors and color and calls the system in update. Change floors and the whole object is rebuilt through the system.',
  section: 'Core API',
  tags: ['registerSystem', 'createComplexObject', 'this.system', 'setObject3D', 'separation of logic and data'],
  docs: ['repo/docs/core/systems.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
