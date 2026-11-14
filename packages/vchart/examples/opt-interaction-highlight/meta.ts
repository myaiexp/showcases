// vchart example: interactions: element-highlight and element-highlight-by-group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "interactions: element-highlight and element-highlight-by-group",
  summary:
    "The interactions array replaces the default hover. element-highlight marks the pointed bar highlight and the rest blur; element-highlight-by-group highlights every bar of the pointed series. The card sets the same states from code with updateState.",
  section: "Option: Common",
  tags: ["interactions","element-highlight","element-highlight-by-group","highlightState","blurState","trigger","triggerOff"],
  docs: [
    'repo/docs/assets/option/en/common/interaction.md',
    'repo/docs/assets/option/en/common/element-active-trigger.md',
    'repo/docs/assets/option/en/common/mark-state-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
