// vchart example: Theme: data palette and group count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: data palette and group count",
  summary:
    "colorScheme.default as a plain array of five colours is applied to the groups in order and starts over for the sixth. A slider (and in the card a timer) changes how many groups the bar chart has.",
  section: "Theme",
  tags: ['colorScheme.default','theme','seriesField'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Color_Theme.md",
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
