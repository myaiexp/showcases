// vchart example: Formatter plugin: t, z, ~ and calc()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Formatter plugin: t, z, ~ and calc()",
  summary:
    "The plugin's own additions to d3-format: t truncates instead of rounding, z drops empty decimals, ~ trims trailing zeros, and a formatter that starts with calc( evaluates an arithmetic expression on v.",
  section: "Plugins",
  tags: ['formatter','calc','~s','truncate'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Plugins/Formatter.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
