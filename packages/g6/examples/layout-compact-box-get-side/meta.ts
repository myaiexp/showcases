// g6 example: CompactBox layout: getSide with direction H
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "CompactBox layout: getSide with direction H",
  summary: "With direction H the root sits in the middle and getSide decides, per node, whether a branch goes to the left or right. A toggle compares the automatic split with a custom one.",
  section: 'Layout',
  tags: ["compact-box", "direction", "getSide"],
  docs: [
    "repo/packages/site/docs/manual/layout/CompactBoxLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
