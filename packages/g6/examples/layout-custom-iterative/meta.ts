// g6 example: Custom layout: an iterative TickTockLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom layout: an iterative TickTockLayout",
  summary: "An iterative layout also implements tick() and stop(), and calls options.onTick on every step. The docs' TickTockLayout flips five nodes between x = 50 and x = 150 every 200 ms, ten times, then settles.",
  section: 'Layout',
  tags: ["BaseLayout", "execute", "tick", "stop", "onTick", "register"],
  docs: [
    "repo/packages/site/docs/manual/layout/custom-layout.en.md",
    "repo/packages/site/common/manual/custom-extension/layout/iterative-layout.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
