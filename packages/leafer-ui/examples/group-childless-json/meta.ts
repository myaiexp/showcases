// leafer-ui example: Group: childlessJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group: childlessJSON",
  summary:
    "toJSON() includes a Group's children unless childlessJSON is true (meant for custom elements that rebuild their own children). The caption shows the JSON size.",
  section: "Group elements",
  tags: ['Group', 'childlessJSON', 'toJSON', 'children'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
