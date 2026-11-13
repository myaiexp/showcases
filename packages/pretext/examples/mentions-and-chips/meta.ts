// Pretext example: @mentions and #tag chips as atomic rich-inline items
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mentions and chips',
  summary:
    'Mentions and tag chips are break: never items whose padding and border are their extraWidth. Pretext lays out the paragraph, each line is painted fragment by fragment, and the full view checks the line count against the browser wrapping the same runs.',
  section: 'Rich inline',
  tags: ['prepareRichInline', 'break never', 'extraWidth', 'chips'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
