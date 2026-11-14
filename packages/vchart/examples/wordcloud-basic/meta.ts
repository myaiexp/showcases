// vchart example: Word cloud: nameField and valueField
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Word cloud: nameField and valueField",
  summary:
    "A wordCloud chart in its simplest form: nameField is the text and valueField its size, seriesField colours each word. Every three seconds updateData reshuffles the weights and the cloud lays itself out again.",
  section: "Word Cloud and Pictogram",
  tags: ['wordCloud','nameField','valueField','seriesField','updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/WordCloud.md',
    'repo/docs/assets/option/en/series/word-cloud.md',
    'repo/docs/assets/option/en/chart/word-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
