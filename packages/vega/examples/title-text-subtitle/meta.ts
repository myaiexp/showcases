// vega example: Title with a Subtitle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Title with a Subtitle",
  summary:
    "A chart title and subtitle with their own fonts, colours and sizes; subtitlePadding, the title size and colours step through four looks.",
  section: "Title",
  tags: ["title.text","title.subtitle","title.subtitlePadding","title.fontSize","title.subtitleColor","title.subtitleFontStyle"],
  docs: ["repo/docs/docs/title.md","repo/docs/docs/config.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
