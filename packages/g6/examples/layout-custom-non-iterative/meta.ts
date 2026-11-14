// g6 example: Custom layout: a non-iterative DiagonalLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom layout: a non-iterative DiagonalLayout",
  summary: "A class that extends BaseLayout and implements execute() returns x and y for every node once; register() adds it as a new layout type. Nodes line up on a diagonal, and a button re-runs it.",
  section: 'Layout',
  tags: ["BaseLayout", "execute", "register", "ExtensionCategory.LAYOUT"],
  docs: [
    "repo/packages/site/docs/manual/layout/custom-layout.en.md",
    "repo/packages/site/common/manual/custom-extension/layout/non-iterative-layout.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
