// vchart example: interactions: element-select with isMultiple and triggerOff
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "interactions: element-select with isMultiple and triggerOff",
  summary:
    "The element-select interaction selects bars on click. isMultiple allows several at once and triggerOff decides what clears them: a click on empty canvas, a timer in milliseconds, or the pointer leaving.",
  section: "Option: Common",
  tags: ["interactions","element-select","isMultiple","triggerOff","empty"],
  docs: [
    'repo/docs/assets/option/en/common/interaction.md',
    'repo/docs/assets/option/en/common/element-active-trigger.md',
    'repo/docs/assets/option/en/common/mark-state-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
