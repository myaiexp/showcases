// g6 example: Graph API: getOptions and setOptions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph API: getOptions and setOptions',
  summary:
    'setOptions changes node and edge styles, theme colours and the layout of a live graph; getOptions reads back the current values.',
  section: 'Graph',
  tags: ['getOptions', 'setOptions', 'theme', 'layout', 'node.style', 'edge.style'],
  docs: [
    'repo/packages/site/docs/api/option.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
