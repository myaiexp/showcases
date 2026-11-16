// leafer-ui example: Custom: addAttr with boundsType
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: addAttr with boundsType",
  summary:
    "The third step: Custom.addAttr('left', 0, boundsType) adds a data attribute with a default of 0 that exports to JSON and reacts to changes. The event log shows each change of left, and the rect moves with it.",
  section: "Custom elements",
  tags: ['addAttr', 'boundsType', 'toJSON', 'PropertyEvent'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/base/attr.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
