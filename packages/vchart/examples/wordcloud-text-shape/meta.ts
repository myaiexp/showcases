// vchart example: Word cloud: a text-shaped mask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Word cloud: a text-shaped mask",
  summary:
    "maskShape of type text lays the words out inside the glyphs of a string, with hollow to fill only the background around it and wordMask to style the outline drawn behind the words.",
  section: "Word Cloud and Pictogram",
  tags: ['maskShape','text','hollow','wordMask','wordCloudShapeConfig'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/WordCloud.md',
    'repo/docs/assets/option/en/series/word-cloud.md',
    'repo/docs/assets/option/en/chart/word-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
