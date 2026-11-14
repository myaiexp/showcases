// vchart example: Word cloud: fontSizeRange and fontWeightRange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Word cloud: fontSizeRange and fontWeightRange",
  summary:
    "fontSizeRange maps the lightest and heaviest word to a smallest and largest font size, and fontWeightRange does the same for weight. Equal numbers fix a size. Sliders change the range; the card steps through four settings.",
  section: "Word Cloud and Pictogram",
  tags: ['fontSizeRange','fontWeightRange','wordCloud'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/WordCloud.md',
    'repo/docs/assets/option/en/series/word-cloud.md',
    'repo/docs/assets/option/en/chart/word-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
