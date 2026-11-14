// vchart example: Formatter plugin: timeMode and custom formatters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Formatter plugin: timeMode and custom formatters",
  summary:
    "The chart spec's formatter key configures the plugin: timeMode 'utc' moves the date labels to UTC, numericFormatter replaces the number formatting (here with Intl), and customFormatter replaces the whole logic.",
  section: "Plugins",
  tags: ['formatter','timeMode','numericFormatter','customFormatter'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Plugins/Formatter.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
