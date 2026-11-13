// babylon-js example: Flow graph: one graph, two contexts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flow graph: one graph, two contexts',
  summary:
    'A FlowGraphCoordinator, one graph and two execution contexts holding different variables. On SceneReady a ConsoleLog block logs a GetVariable message, a SetProperty block writes it into the page, and an Interpolation block feeds PlayAnimation, which moves each context’s own mesh out and back.',
  section: 'Flow Graph',
  tags: ['FlowGraphCoordinator', 'createContext', 'FlowGraphInterpolationBlock', 'FlowGraphPlayAnimationBlock', 'FlowGraphGetVariableBlock'],
  docs: [
    'repo/content/features/featuresDeepDive/flowGraph.md',
    'repo/content/features/featuresDeepDive/flowGraph/flowGraphBasicConcepts.md',
    'repo/content/features/featuresDeepDive/flowGraph/flowGraphExamples.md',
    'repo/content/features/featuresDeepDive/flowGraph/flowGraphBlocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
