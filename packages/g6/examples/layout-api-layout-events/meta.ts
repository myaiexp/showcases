// g6 example: Graph.layout: before and after events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph.layout: before and after events",
  summary: "BEFORE_LAYOUT and AFTER_LAYOUT fire around every layout() call, including the one made with an options object that overrides the graph layout. The log lists each event.",
  section: 'Layout',
  tags: ["layout()", "GraphEvent.BEFORE_LAYOUT", "GraphEvent.AFTER_LAYOUT", "layoutOptions"],
  docs: [
    "repo/packages/site/docs/api/layout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
