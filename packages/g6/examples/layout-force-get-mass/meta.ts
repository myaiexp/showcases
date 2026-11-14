// g6 example: Force layout: getMass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: getMass",
  summary: "getMass returns a mass per node; heavier nodes move less under the same force. A toggle makes each cluster hub 20 times heavier than the rest.",
  section: 'Layout',
  tags: ["force", "getMass"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
