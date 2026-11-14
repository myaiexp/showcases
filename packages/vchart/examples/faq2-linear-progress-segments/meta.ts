// vchart example: FAQ: a segmented progress bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: a segmented progress bar",
  summary:
    "A linearProgress chart plus extensionMark rules: each rule is a short white line at 1/n of the bar, positioned with valueToX and valueToY from the mark context, so the bar looks cut into segments.",
  section: 'FAQ',
  tags: ['linearProgress','extensionMark','rule','valueToX'],
  docs: [
    'repo/docs/assets/faq/en/154- Segmented display of bar progress chart.md',
    'repo/docs/assets/option/en/series/linear-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
