// vchart example: Word cloud: an image mask drawn on a canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Word cloud: an image mask drawn on a canvas",
  summary:
    "maskShape accepts an image, here a data URL drawn on a canvas in the example so nothing is fetched. The words fill the dark pixels of a ring, a moon or a bolt.",
  section: "Word Cloud and Pictogram",
  tags: ['maskShape','data URL','wordCloudShapeConfig','fillingColorList'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/WordCloud.md',
    'repo/docs/assets/option/en/series/word-cloud.md',
    'repo/docs/assets/option/en/chart/word-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
