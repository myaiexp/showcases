// leafer-ui example: Custom: a line drawn from path commands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: a line drawn from path commands",
  summary:
    "A UI subclass that overrides __updatePath() draws its own geometry with PathCommandDataHelper (moveTo, lineTo, closePath). For an open line strokeAlign must default to 'center'; __updateBoxBounds() takes the bounds from the path.",
  section: "Custom elements",
  tags: ['UI', '__updatePath', '__updateBoxBounds', 'PathCommandDataHelper', 'PathBounds', 'strokeAlign'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/path.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
