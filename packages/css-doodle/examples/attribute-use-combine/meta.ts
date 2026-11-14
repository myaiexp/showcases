// css-doodle example: The use attribute: several rules and extras
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The use attribute: several rules and extras",
  summary:
    "use=\"var(--rule-grid), var(--rule-pattern)\" combines two stored rules, and the code inside the element is merged in after them: here it adds a pink outline on :doodle.",
  section: "Attributes",
  tags: ['use', 'custom properties', ':doodle'],
  docs: [
    'pages/css-doodle-com/reference/attribute-use.md',
    'pages/css-doodle-com/reference/selector-doodle.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
