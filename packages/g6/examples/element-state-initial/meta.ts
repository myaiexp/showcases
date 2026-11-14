// g6 example: Element state: initial states in data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Element state: initial states in data',
  summary:
    'Nodes and edges start with states from their data, one or several; a button changes them at runtime and another loads the data again.',
  section: 'Element',
  tags: ['data.nodes.states', 'data.edges.states', 'setData', 'setElementState'],
  docs: [
    'repo/packages/site/docs/manual/element/state.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
