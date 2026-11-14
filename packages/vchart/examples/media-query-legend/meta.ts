// vchart example: Media query: legend and title by height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Media query: legend and title by height",
  summary:
    "A media query with maxHeight 200 moves a bottom legend to the left, hides the title and shrinks the padding. The container is resized from code (a slider in the full view) to show the query firing; registerMediaQuery enables the plugin.",
  section: "Self-adaption",
  tags: ['media','registerMediaQuery','maxHeight','filterType','filter'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Self-adaption/Media_Query.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
