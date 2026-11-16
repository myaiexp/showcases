// leafer-ui example: Custom: a set handler in the data class
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: a set handler in the data class",
  summary:
    "A data class can define setWidth(value): it becomes the setter for width and stores the computed value (here rounded up with Math.ceil). The caption shows the input and the stored number.",
  section: "Custom elements",
  tags: ['RectData', 'registerData', 'setWidth', '__'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/base/attr.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
