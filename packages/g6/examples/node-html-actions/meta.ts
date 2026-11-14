// g6 example: HTML node: cards with buttons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HTML node: cards with buttons",
  summary:
    "HTML nodes whose innerHTML is an HTMLElement with Restart and Monitor buttons wired by addEventListener. Restart updates the node data.",
  section: 'Node',
  tags: ['html', 'innerHTML', 'HTMLElement', 'updateNodeData'],
  docs: ['repo/packages/site/docs/manual/element/node/Html.en.md', 'repo/packages/site/common/api/elements/nodes/html.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
