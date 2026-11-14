// marked example: Abbreviation tooltips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Abbreviation tooltips",
  summary:
    "Write *[HR]: Human Resources once and every HR in the text gets a dotted underline with the meaning as a tooltip. A block extension collects the definitions and an inline one finds the words, using start().",
  section: 'Custom extensions',
  tags: ['extensions','abbr','start','hooks','preprocess'],
  docs: ['repo/docs/USING_PRO.md','repo/src/Instance.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
