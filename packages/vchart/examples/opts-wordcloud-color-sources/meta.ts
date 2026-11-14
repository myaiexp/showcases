// vchart example: Word cloud colours: colorMode, colorList and colorHexField
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Word cloud colours: colorMode, colorList and colorHexField",
  summary: "A word cloud can be coloured four ways: ordinal colours per seriesField value from a colorList, the same colorList as a gradient over the weight, colours straight from a hex field in the data (colorHexField), or the theme palette. A select switches the source.",
  section: "Option: Series",
  tags: ["wordCloud.colorMode","colorList","colorHexField","seriesField"],
  docs: [
    'repo/docs/assets/option/en/series/word-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
