// postprocessing example: Selection.exclusive removes objects from other layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: exclusive',
  summary:
    'With `exclusive` false, adding an object to a Selection only enables the selection\'s layer, so the object stays in the normal render. With `exclusive` true, add() sets the object to that one layer, and the main RenderPass (layer 0) no longer draws it: only the second, selection-only pass does, as flat cyan. The flag affects objects added after it changes.',
  section: 'Utilities',
  tags: ['Selection', 'exclusive', 'set', 'layer', 'RenderPass', 'overrideMaterial'],
  docs: ['repo/README.md', 'repo/src/core/Selection.js', 'repo/src/passes/RenderPass.js', 'repo/src/passes/CopyPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
