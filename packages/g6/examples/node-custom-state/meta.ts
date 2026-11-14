// g6 example: Custom node: shape styled by state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom node: shape styled by state",
  summary:
    "A custom node whose hole shape reads holeFill; node.state sets holeFill to orange for selected. Clicking the node toggles the state; the card cycles it.",
  section: 'Node',
  tags: ['register', 'node.state', 'setElementState', 'upsert', 'node:click'],
  docs: ['repo/packages/site/docs/manual/element/node/custom-node.en.md', 'repo/packages/site/docs/api/element.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
