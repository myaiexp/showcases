// vchart example: Crosshair that follows the tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Crosshair that follows the tooltip",
  summary: "With crosshair.followTooltip the lines appear and vanish together with the tooltip, and the object form turns the crosshair off for chosen tooltip types. A select picks which types keep their crosshair.",
  section: "Option: Components",
  tags: ["crosshair.followTooltip","xField","yField","tooltip.activeType"],
  docs: [
    'repo/docs/assets/option/en/component/crosshair.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
