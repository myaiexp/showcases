// marked example: Footnotes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Footnotes",
  summary:
    "Mark a claim with [^1] and write the note anywhere below; the page gets small numbers and a numbered list of notes at the end. A block extension, an inline extension and two hooks (preprocess and postprocess) cooperate.",
  section: 'Custom extensions',
  tags: ['extensions','hooks','preprocess','postprocess','block','inline'],
  docs: ['repo/docs/USING_PRO.md','repo/src/Instance.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
