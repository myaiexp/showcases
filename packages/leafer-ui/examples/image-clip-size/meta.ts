// leafer-ui example: Image paint: size sets the picture's own dimensions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image paint: size sets the picture's own dimensions",
  summary: "size is converted to a scale: a number, a lone width or height (the other side follows the ratio), or both (which stretches). The select compares the four forms in clip mode.",
  section: "Appearance",
  tags: ["image","clip","size","IOptionSizeData"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/paint/image.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/fill.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
