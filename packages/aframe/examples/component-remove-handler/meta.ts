// aframe example: remove: undo a component's work on removeAttribute and removeChild
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'remove: undo a component\'s work on removeAttribute and removeChild',
  summary:
    'A halo component sets a torus with setObject3D and takes it away in remove. Removing the attribute, or detaching the whole entity, calls remove and the board shows the object3DMap emptying.',
  section: 'Core API',
  tags: ['remove', 'removeAttribute', 'removeChild', 'setObject3D', 'removeObject3D'],
  docs: ['repo/docs/core/component.md', 'repo/docs/core/entity.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
