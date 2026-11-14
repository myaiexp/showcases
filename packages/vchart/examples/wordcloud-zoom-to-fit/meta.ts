// vchart example: Word cloud: zoomToFit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Word cloud: zoomToFit",
  summary:
    "wordCloudConfig.zoomToFit with enlarge scales a sparse cloud up to the canvas (capped by fontSizeLimitMax), and with shrink squeezes a crowded one down until every word fits (down to fontSizeLimitMin).",
  section: "Word Cloud and Pictogram",
  tags: ['wordCloudConfig','zoomToFit','enlarge','shrink','fontSizeLimitMax','fontSizeLimitMin'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/WordCloud.md',
    'repo/docs/assets/option/en/series/word-cloud.md',
    'repo/docs/assets/option/en/chart/word-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
