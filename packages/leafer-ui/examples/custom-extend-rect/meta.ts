// leafer-ui example: Custom: inherit Rect and add a dataType attribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: inherit Rect and add a dataType attribute",
  summary:
    "Extending Rect is the recommended way to add data: Custom.addAttr('top', 0, dataType) adds a top property that appears in toJSON() without touching layout. The caption lists the JSON.",
  section: "Custom elements",
  tags: ['registerUI', 'addAttr', 'dataType', 'toJSON', 'Rect'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/extends.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
