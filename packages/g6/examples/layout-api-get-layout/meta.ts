// g6 example: Graph.getLayout: read the current layout options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph.getLayout: read the current layout options",
  summary: "getLayout returns the options set by the last setLayout call. The readout prints them as JSON after each of three setLayout buttons.",
  section: 'Layout',
  tags: ["getLayout", "setLayout", "LayoutOptions"],
  docs: [
    "repo/packages/site/docs/api/layout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
