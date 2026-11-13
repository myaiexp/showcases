// Pretext example: rich inline with white-space pre-wrap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Styled runs in pre-wrap',
  summary:
    'An editor-like paragraph of keyword, string and comment runs is prepared with { whiteSpace: \'pre-wrap\' }, so tabs, newlines and spaces survive inside the fragments and no gaps are collapsed. Each line is painted with white-space: pre, and the full view checks its line count against a browser pre-wrap paragraph.',
  section: 'Rich inline',
  tags: ['pre-wrap', 'prepareRichInline', 'tabs', 'newlines'],
  docs: ['repo/README.md', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
