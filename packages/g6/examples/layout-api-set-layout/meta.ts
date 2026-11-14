// g6 example: Graph.setLayout: object and function forms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph.setLayout: object and function forms",
  summary: "setLayout takes a layout object or a function of the previous options; it does not run the layout, so layout() is a second call. Two buttons apply each form and a third runs the layout.",
  section: 'Layout',
  tags: ["setLayout", "layout()", "force", "radial"],
  docs: [
    "repo/packages/site/docs/api/layout.en.md",
    "repo/packages/site/docs/manual/layout/overview.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
