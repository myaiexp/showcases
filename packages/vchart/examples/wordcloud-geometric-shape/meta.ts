// vchart example: Word cloud: geometric mask with two colour lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Word cloud: geometric mask with two colour lists",
  summary:
    "maskShape of type geometric with a fill and backgroundColor makes a shape word cloud: colorList colours the core words and wordCloudShapeConfig.fillingColorList the small filling words, over a visible wordMask.",
  section: "Word Cloud and Pictogram",
  tags: ['maskShape','geometric','colorList','fillingColorList','wordMask'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/WordCloud.md',
    'repo/docs/assets/option/en/series/word-cloud.md',
    'repo/docs/assets/option/en/chart/word-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
