// marked example: An image inside a link
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "An image inside a link",
  summary:
    "A picture that is also a link is a common pattern for badges and thumbnails. The docs quote markdown.js mangling it into a broken link; Marked makes a link around an image, outlined here.",
  section: 'Markdown is broken',
  tags: ["images", "links", "markdown.js"],
  docs: ["repo/docs/broken.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
