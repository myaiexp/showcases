// g6 example: Indented layout: dropCap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Indented layout: dropCap",
  summary: "By default the first child of each node starts on a new line. dropCap false puts it on the parent own row. A toggle flips it.",
  section: 'Layout',
  tags: ["indented", "dropCap"],
  docs: [
    "repo/packages/site/docs/manual/layout/IndentedLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
