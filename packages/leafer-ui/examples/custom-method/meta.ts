// leafer-ui example: Custom: methods and plain properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: methods and plain properties",
  summary:
    "The fourth step: ordinary methods. startAnimate() sets a plain property and keeps rotating through nextRender(), stopAnimate() clears it; pressing the element toggles. The card taps the rect with a fake pointer.",
  section: "Custom elements",
  tags: ['registerUI', 'nextRender', 'PointerEvent', 'rotation'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/base/method.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
