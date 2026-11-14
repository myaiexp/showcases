// vchart example: Region clip: cutting marks at the plot edge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Region clip: cutting marks at the plot edge",
  summary:
    "A line runs past a capped value axis. region.clip decides whether the part outside the region's layout rectangle is drawn or cut off. A select toggles it and the card alternates.",
  section: "Option: Common",
  tags: ["region","clip","layout","axes max"],
  docs: [
    'repo/docs/assets/option/en/common/region.md',
    'repo/docs/assets/option/en/common/layout-item.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
