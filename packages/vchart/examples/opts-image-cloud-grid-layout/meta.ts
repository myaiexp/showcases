// vchart example: Image cloud: grid layout cells
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image cloud: grid layout cells",
  summary: "layoutConfig layoutMode 'grid' gives every image a fixed cell, so weight no longer changes size. cellType chooses rect, circle or hexagonal cells and placement chooses how the cells follow the mask shape.",
  section: "Option: Series",
  tags: ["imageCloud","layoutConfig.layoutMode","cellType","placement","rectAspectRatio"],
  docs: [
    'repo/docs/assets/option/en/series/image-cloud.md',
    'repo/docs/assets/option/en/chart/image-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
