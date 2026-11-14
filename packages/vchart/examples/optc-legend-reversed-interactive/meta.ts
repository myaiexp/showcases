// vchart example: Legend reversed, interactive and filter switches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Legend reversed, interactive and filter switches",
  summary: "reversed flips the order of the legend items; interactive: false makes the legend inert; filter: false lets clicks toggle the state without filtering the data. Controls flip each switch.",
  section: "Option: Components",
  tags: ["legends.reversed","legends.interactive","legends.filter","allowAllCanceled"],
  docs: [
    'repo/docs/assets/option/en/component/legend-common/base-legend.md',
    'repo/docs/assets/option/en/component/legend-discrete.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
