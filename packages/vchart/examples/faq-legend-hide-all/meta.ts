// vchart example: FAQ: start with every legend item hidden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: start with every legend item hidden",
  summary:
    "legends.defaultSelected set to an empty array draws the chart with all items unselected; leave it out and everything shows. Buttons rebuild the chart either way, and a click on a legend item brings one series back.",
  section: 'FAQ',
  tags: ["legends.defaultSelected","legends"],
  docs: [
    "repo/docs/assets/faq/en/68- Is there a way to deselect all line chart contents currently set to display by default (e.g., a button to hide all).md",
    "repo/docs/assets/option/en/component/legend-discrete.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
