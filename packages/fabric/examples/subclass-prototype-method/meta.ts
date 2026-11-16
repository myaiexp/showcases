// fabric example: Subclassing: patching a subclass prototype, not FabricObject
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassing: patching a subclass prototype, not FabricObject',
  summary:
    'core-concepts mutates FabricObject.prototype. Here a method and a wrapped _render are patched onto the prototype of a subclass made for the example, and the panel shows Rect and FabricObject are left alone.',
  section: 'Subclassing',
  tags: ['prototype', 'FabricObject', 'Rect', '_render'],
  docs: [
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/classes/Rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
