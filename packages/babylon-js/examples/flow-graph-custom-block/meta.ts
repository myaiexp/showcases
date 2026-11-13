// babylon-js example: Flow graph: writing your own blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flow graph: writing your own blocks',
  summary:
    'Two custom blocks from the advanced-usage page: a data block extending FlowGraphBlock that computes a sine wave in _updateOutputs, and an execution block extending FlowGraphExecutionBlock that passes every Nth signal and keeps its count in the context’s execution variables. They drive the cube’s height and a FlipFlop colour swap.',
  section: 'Flow Graph',
  tags: ['FlowGraphBlock', 'FlowGraphExecutionBlock', 'registerDataInput', '_updateOutputs', '_execute'],
  docs: [
    'repo/content/features/featuresDeepDive/flowGraph/flowGraphAdvancedUsage.md',
    'repo/content/features/featuresDeepDive/flowGraph/flowGraphBlocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
