// postprocessing example: Selection.setVisible toggles render layer 0 for the members
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: setVisible',
  summary:
    'setVisible(false) disables layer 0 on every selected object, so the main pass stops drawing them, while they stay in the Selection and on its own layer. A second RenderPass that renders only the selection layer still shows them, as a cyan tint. setVisible(true) puts them back.',
  section: 'Utilities',
  tags: ['Selection', 'setVisible', 'layer', 'RenderPass', 'overrideMaterial'],
  docs: ['repo/README.md', 'repo/src/core/Selection.js', 'repo/src/passes/RenderPass.js', 'repo/src/passes/CopyPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
