// Pretext example: shrink-wrapping chat bubbles around rich-inline messages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shrink-wrapped rich bubbles',
  summary:
    'measureRichInlineStats() gives the widest line of a message at the available width; rounding it up sizes each bubble to its text. Mentions and code spans paint inside, and the whole chat re-wraps as its width changes without preparing again.',
  section: 'Rich inline',
  tags: ['measureRichInlineStats', 'walkRichInlineLineRanges', 'shrink-wrap', 'chat'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
