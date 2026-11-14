// vchart example: Word cloud: drawOutOfBound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Word cloud: drawOutOfBound",
  summary:
    "Three phrases are wider than the canvas. wordCloudConfig.drawOutOfBound clip draws them cut at the edge; hidden leaves them out.",
  section: "Word Cloud and Pictogram",
  tags: ['wordCloudConfig','drawOutOfBound','clip','hidden'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/WordCloud.md',
    'repo/docs/assets/option/en/series/word-cloud.md',
    'repo/docs/assets/option/en/chart/word-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
