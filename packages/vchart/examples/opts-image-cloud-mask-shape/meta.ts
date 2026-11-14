// vchart example: Image cloud: maskShape and spiral layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image cloud: maskShape and spiral layout",
  summary: "An imageCloud series packs canvas-drawn badges (data URLs, weighted by value) into a shape. maskShape (a geometric shape object) picks the outline, imageSizeRange the size spread, and the default spiral layout fills the shape. A select (and the card's timer) swaps the outline.",
  section: "Option: Series",
  tags: ["imageCloud","registerImageCloudChart","maskShape","imageSizeRange","urlField","valueField","layoutConfig"],
  docs: [
    'repo/docs/assets/option/en/chart/image-cloud.md',
    'repo/docs/assets/option/en/series/image-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
