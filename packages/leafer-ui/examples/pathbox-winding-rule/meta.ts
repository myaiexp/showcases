// leafer-ui example: PathBox: windingRule nonzero or evenodd
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PathBox: windingRule nonzero or evenodd",
  summary:
    "PathBox paints a path like Path does: with evenodd the circle inside the rounded square is a hole, with nonzero the two shapes are filled together. The child circle is unaffected.",
  section: 'Official plugins',
  tags: ["PathBox", "path", "windingRule"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/PathBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
