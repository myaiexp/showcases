// vchart example: Formatter plugin: time formats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Formatter plugin: time formats",
  summary:
    "A timestamp field formatted with d3-time-format patterns after the colon, such as %Y-%m-%d, %b %d and %B %e, %Y, in the band axis labels and the tooltip title. A selector steps through six patterns.",
  section: "Plugins",
  tags: ['formatter','d3-time-format','axis label','tooltip'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Plugins/Formatter.md",
    "repo/docs/assets/option/en/component/axis-common/axis-label.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
