// css-doodle example: @use: rules from custom properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@use: rules from custom properties",
  summary:
    "Rules wrapped in parentheses live in custom properties, here --rule-aa and --rule-bb on the element, and @use stitches them into the code. The doodle itself only adds a background colour.",
  section: "Properties",
  tags: ['@use', 'custom properties', '@r'],
  docs: [
    'pages/css-doodle-com/reference/property-use.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
