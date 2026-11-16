// leafer-ui example: ImageBox: overflow hide clips children to the picture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ImageBox: overflow hide clips children to the picture",
  summary:
    "An ImageBox is a Box, so overflow: \"hide\" clips its children to the box area. The circle child that pokes out of the picture is cut at the edge, and \"show\" lets it out.",
  section: 'Official plugins',
  tags: ["ImageBox", "overflow", "url", "Box"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/ImageBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
