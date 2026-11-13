// mermaid example: step-by-step edge animation in a flowchart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Step-by-step edge animation',
  summary:
    'Edge ids plus `step` numbers make a dot travel the flowchart in order, looping after the last step. Shared step numbers play together; `stepNumbers` adds badges and `stepDuration` sets the pace.',
  section: 'Flowchart',
  tags: ['flowchart', 'edge ids', 'step', 'animate', 'stepDuration', 'stepNumbers'],
  docs: ['repo/packages/mermaid/src/docs/syntax/flowchart.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
