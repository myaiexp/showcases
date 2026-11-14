// vchart example: select: mode, trigger and triggerOff
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "select: mode, trigger and triggerOff",
  summary:
    "The chart-level select option sets how bars are selected: mode single or multiple, the trigger event and the triggerOff event that clears the selection. Click the bars in the full view; the card selects bars from code.",
  section: "Option: Common",
  tags: ["select","mode","trigger","triggerOff","selected","setSelected"],
  docs: [
    'repo/docs/assets/option/en/common/select.md',
    'repo/docs/assets/option/en/common/trigger.md',
    'repo/docs/assets/option/en/common/mark-state-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
