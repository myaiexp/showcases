// leafer-ui example: PathBox: strokeAlign defaults to center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PathBox: strokeAlign defaults to center",
  summary:
    "PathBox starts with strokeAlign \"center\" (a plain Box starts with \"inside\"), so a stroke straddles the path. The select switches inside, center and outside on the same path.",
  section: 'Official plugins',
  tags: ["PathBox", "strokeAlign", "stroke"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/PathBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
