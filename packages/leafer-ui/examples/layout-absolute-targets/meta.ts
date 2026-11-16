// leafer-ui example: Layout: absolute targets for the incremental methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: absolute targets for the incremental methods",
  summary:
    "rotateOf, scaleOf and skewOf add to the current value. To reach a target, pass the target minus what is there: 45 - rect.rotation, 1.5 / rect.scale, 45 - rect.skewX.",
  section: "Layout",
  tags: ["rotateOf","scaleOf","skewOf"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/rotation.md',
    'pages/www-leaferjs-com/ui/en/reference/UI/scale.md',
    'pages/www-leaferjs-com/ui/en/reference/UI/skew.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
