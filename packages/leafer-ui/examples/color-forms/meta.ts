// leafer-ui example: Color: strings, RGB and RGBA objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Color: strings, RGB and RGBA objects",
  summary: "A Color is any CSS colour string, an { r, g, b } object (0 to 255) or an { r, g, b, a } object with alpha 0 to 1; objects go in a solid paint. Six swatches take the same green in six forms; the alpha slider changes the two with alpha.",
  section: "Appearance",
  tags: ["Color","fill","RGB","RGBA","StringColor"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/interface/ui/Color.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/fill.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
