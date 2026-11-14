// observable-plot example: Text: wrapping with lineWidth and textOverflow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text: wrapping with lineWidth and textOverflow',
  summary:
    'Three paragraphs of Moby-Dick wrapped to lineWidth ems (a soft hyphen splits coffin); textOverflow instead truncates each to one line.',
  section: 'Mark: Text',
  tags: ['text', 'lineWidth', 'textOverflow', 'textAnchor', 'frameAnchor'],
  docs: ['repo/docs/marks/text.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
