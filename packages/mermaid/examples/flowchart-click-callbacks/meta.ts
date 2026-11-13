// mermaid example: Click callbacks on nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click callbacks on nodes',
  summary:
    'With securityLevel loose, `click node callback` calls a page function with the node id; here each click updates a readout under the diagram.',
  section: 'Flowchart',
  tags: ['flowchart', 'click', 'callback', 'securityLevel', 'interaction'],
  docs: ['repo/packages/mermaid/src/docs/syntax/flowchart.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
