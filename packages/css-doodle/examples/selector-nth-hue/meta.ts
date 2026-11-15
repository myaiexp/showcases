// css-doodle example: @nth against :nth-child()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@nth against :nth-child()",
  summary:
    "The block under @nth is filled in once for each cell it picks, so @i gives every second cell its own hue. A plain :nth-child() stays CSS for the browser to match, and draws the same picture.",
  section: "Selectors",
  tags: ['@nth', ':nth-child', '@i'],
  docs: [
    'pages/css-doodle-com/reference/selector-nth.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
