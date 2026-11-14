// g6 example: Element state: stacking order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Element state: stacking order',
  summary:
    'Two states that both set the stroke, applied in opposite order to two nodes: the state later in the array wins on shared properties.',
  section: 'Element',
  tags: ['setElementState', 'selected', 'highlight', 'node.state'],
  docs: [
    'repo/packages/site/docs/manual/element/state.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
