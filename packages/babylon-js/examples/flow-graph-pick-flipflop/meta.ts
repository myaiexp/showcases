// babylon-js example: Flow graph: picks, flip-flops and gates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flow graph: picks, flip-flops and gates',
  summary:
    'Three lamps, each behind a FlipFlop block whose onOn and onOff outputs run SetProperty blocks on the lamp’s emissive colour. MeshPick events toggle a lamp through a CallCounter, and a SceneTick event throttled by a Throttle block steps a looping MultiGate that walks the lamps on its own.',
  section: 'Flow Graph',
  tags: ['FlowGraphMeshPickEventBlock', 'FlowGraphFlipFlopBlock', 'FlowGraphMultiGateBlock', 'FlowGraphThrottleBlock', 'FlowGraphCallCounterBlock'],
  docs: [
    'repo/content/features/featuresDeepDive/flowGraph/flowGraphBasicConcepts.md',
    'repo/content/features/featuresDeepDive/flowGraph/flowGraphBlocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
