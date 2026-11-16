// leafer-ui example: Custom: a Star from the UI base class
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: a Star from the UI base class",
  summary:
    "The freest route subclasses UI directly: pathType attributes points and innerRadius re-run __updatePath(), which walks the outer and inner circle with PathCommandDataHelper to build a star. The sliders edit both attributes.",
  section: "Custom elements",
  tags: ['UI', 'pathType', '__updatePath', 'PathCommandDataHelper', 'addAttr'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/ui.md',
    'pages/www-leaferjs-com/ui/en/reference/display/custom/attr.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
