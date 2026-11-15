// vega example: Legend Channels: Fill, Shape and Size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Legend Channels: Fill, Shape and Size",
  summary:
    "Two symbol legends: one combines a fill scale and a shape scale for the groups, the other shows a size scale for the values. The dots drift so the card stays alive.",
  section: "Legends",
  tags: ["legends.fill","legends.shape","legends.size","scale.type"],
  docs: ["repo/docs/docs/legends.md","repo/docs/docs/marks/symbol.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
