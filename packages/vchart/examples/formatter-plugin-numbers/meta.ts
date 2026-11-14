// vchart example: Formatter plugin: number formats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Formatter plugin: number formats",
  summary:
    "label.formatter strings such as {value:,.0f}, {value:.1%}, {value:~s} and {value:e} format the same five values with the d3-format style the formatter plugin reads. The axis label uses the same syntax.",
  section: "Plugins",
  tags: ['formatter','d3-format','label.formatter','axis label'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Plugins/Formatter.md",
    "repo/docs/assets/option/en/component/label.md",
    "repo/docs/assets/option/en/component/axis-common/axis-label.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
