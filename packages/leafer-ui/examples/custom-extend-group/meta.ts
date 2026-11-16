// leafer-ui example: Custom: inherit Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: inherit Group",
  summary:
    "A custom Group can add children itself in its constructor; childlessJSON: true keeps them out of toJSON() because the class rebuilds them. Toggle it and read the JSON keys.",
  section: "Custom elements",
  tags: ['registerUI', 'Group', 'childlessJSON', 'dataType', 'toJSON'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/extends.md',
    'pages/www-leaferjs-com/ui/en/reference/display/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
