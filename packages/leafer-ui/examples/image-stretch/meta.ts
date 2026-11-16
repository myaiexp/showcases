// leafer-ui example: Image paint: stretch mode distorts the picture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image paint: stretch mode distorts the picture",
  summary: "stretch ignores the picture's ratio and fills the whole box. The slider changes the box width so the picture squashes with it.",
  section: "Appearance",
  tags: ["image","stretch","width"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/paint/image.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/fill.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
