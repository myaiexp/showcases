// vchart example: hover: trigger, triggerOff and enable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "hover: trigger, triggerOff and enable",
  summary:
    "The chart-level hover option picks which pointer event starts the hover state and which ends it, or turns hover off. The full view changes the events; the card steps the hover state through the bars from code.",
  section: "Option: Common",
  tags: ["hover","trigger","triggerOff","enable","setHovered"],
  docs: [
    'repo/docs/assets/option/en/common/hover.md',
    'repo/docs/assets/option/en/common/trigger.md',
    'repo/docs/assets/option/en/common/mark-state-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
