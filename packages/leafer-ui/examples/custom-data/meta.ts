// leafer-ui example: Custom: registerData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: registerData",
  summary:
    "The second step: a data class (extending RectData) that stores and computes the element's data, registered with Custom.registerData(). The caption checks custom.__ is an instance of it.",
  section: "Custom elements",
  tags: ['registerData', 'RectData', '__', 'toJSON'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/base/data.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
