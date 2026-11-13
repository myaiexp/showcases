// babylon-js example: Flow graph: custom events between graphs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flow graph: custom events between graphs',
  summary:
    'Three graphs on one coordinator. The sender throttles SceneTick and fires SendCustomEvent with a Random height; a mover graph receives it and hops the ball with a two-keyframe Interpolation, and a painter graph receives the same event and recolours the ball through a CodeExecution block. notifyCustomEvent raises it from code.',
  section: 'Flow Graph',
  tags: ['FlowGraphSendCustomEventBlock', 'FlowGraphReceiveCustomEventBlock', 'FlowGraphRandomBlock', 'FlowGraphCodeExecutionBlock', 'notifyCustomEvent'],
  docs: [
    'repo/content/features/featuresDeepDive/flowGraph/flowGraphBasicConcepts.md',
    'repo/content/features/featuresDeepDive/flowGraph/flowGraphBlocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
