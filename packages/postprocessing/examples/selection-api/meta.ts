// postprocessing example: the Selection class and its Set methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: add, delete, toggle, set, clear',
  summary:
    'A Selection is a Set of objects tied to one render layer: add() enables the layer on the object, delete() disables it, and toggle(), set() and clear() build on those. A RenderPass given the selection draws only that layer, here as a cyan tint. The full view lists every object\'s layers.mask; the layer select moves the whole selection to another layer.',
  section: 'Utilities',
  tags: ['Selection', 'add', 'delete', 'toggle', 'set', 'clear', 'layer', 'RenderPass', 'overrideMaterial'],
  docs: ['repo/README.md', 'repo/src/core/Selection.js', 'repo/src/passes/RenderPass.js', 'repo/src/passes/CopyPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
