// Pretext example: RichInlineBox items for emoji and pictures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom emoji and images as boxes',
  summary:
    'A { width } item is an inline box with no text: a custom emoji, a badge or a picture. Lines can break on either side of one, and each line is as tall as the paragraph line height or its tallest box, so the example sums per-line heights from the fragments.',
  section: 'Rich inline',
  tags: ['RichInlineBox', 'inline images', 'line height', 'custom emoji'],
  docs: ['repo/README.md', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
