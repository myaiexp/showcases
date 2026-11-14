// g6 example: Radial layout: focusNode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radial layout: focusNode",
  summary: "focusNode picks the node at the centre of the rings. A select moves the focus around the graph and the layout re-runs around the new centre.",
  section: 'Layout',
  tags: ["radial", "focusNode"],
  docs: [
    "repo/packages/site/docs/manual/layout/RadialLayout.en.md",
    "repo/packages/site/common/api/layouts/radial.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
