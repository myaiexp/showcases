// postprocessing example: RenderPass selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'RenderPass: selection',
  summary:
    'A Selection holds every object of the showroom except the floor. Assigning it to renderPass.selection draws only those objects (the pass renders the selection layer); assigning null draws the whole scene again.',
  section: 'Passes',
  tags: ['RenderPass', 'selection', 'Selection', 'layer', 'EffectComposer'],
  docs: ['repo/README.md', 'repo/src/passes/RenderPass.js', 'repo/src/core/Selection.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
