// g6 example: Graph option node: type, style and state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph option node: type, style and state',
  summary:
    'The node option sets the type, the style and a style per state; hover and selected states are applied from pointer events or on a timer.',
  section: 'Graph',
  tags: ['node', 'node.type', 'node.style', 'node.state', 'setElementState', 'click-select'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
