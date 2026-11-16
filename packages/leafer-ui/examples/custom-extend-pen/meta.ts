// leafer-ui example: Custom: inherit Pen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: inherit Pen",
  summary:
    "Extending Pen gives a custom element that draws combinations: size is a boundsType attribute and its data class's setSize() rebuilds the shapes. The docs enlarge it after two seconds; here a slider does.",
  section: "Custom elements",
  tags: ['registerUI', 'Pen', 'addAttr', 'boundsType', 'registerData', 'setSize'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/extends.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
