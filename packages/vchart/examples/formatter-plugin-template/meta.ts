// vchart example: Formatter plugin: variable templates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Formatter plugin: variable templates",
  summary:
    "Strings with {variable} fields are filled from the datum: a label reading '2018: 1,021,000', a tooltip title and a tooltip row built with keyFormatter and valueFormatter. The tooltip walks across the bars on its own.",
  section: "Plugins",
  tags: ['formatter','keyFormatter','valueFormatter','tooltip'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Plugins/Formatter.md",
    "repo/docs/assets/option/en/component/tooltip-common/tooltip-line-pattern.md",
    "repo/docs/assets/option/en/component/label.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
