// g6 example: Diamond node: built-in states, halo, badges, ports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Diamond node: built-in states, halo, badges, ports",
  summary:
    "Nine diamond nodes: plain, with halo, badges and ports, and one in each built-in state (active, selected, highlight, inactive, disabled). The \"default\" node cycles through the states.",
  section: 'Node',
  tags: ['diamond','states','setElementState','halo','badges','ports'],
  docs: ['repo/packages/site/docs/manual/element/node/Diamond.en.md', 'repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/docs/api/element.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
