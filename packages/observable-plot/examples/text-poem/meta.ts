// observable-plot example: Text: multi-line text and frameAnchor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text: multi-line text and frameAnchor',
  summary:
    'One string with newlines renders as several lines; frameAnchor places the block in the frame when there is no x or y.',
  section: 'Mark: Text',
  tags: ['text', 'frameAnchor', 'newline', 'frame'],
  docs: ['repo/docs/marks/text.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
