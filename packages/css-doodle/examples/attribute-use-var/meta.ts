// css-doodle example: The use attribute: rules in custom properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The use attribute: rules in custom properties",
  summary:
    "The element holds its whole code in a custom property, --rule, and use=\"var(--rule)\" loads it. The rule picks a diagonal gradient at random, so each new seed is a different weave.",
  section: "Attributes",
  tags: ['use', 'custom properties', '@p', '@grid'],
  docs: [
    'pages/css-doodle-com/reference/attribute-use.md',
    'pages/css-doodle-com/reference/property-use.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
