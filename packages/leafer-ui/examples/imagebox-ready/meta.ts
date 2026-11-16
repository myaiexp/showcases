// leafer-ui example: ImageBox: ready and image once the picture has loaded
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ImageBox: ready and image once the picture has loaded",
  summary:
    "ImageBox exposes ready (true once the picture has loaded) and image (the loaded image object). The readout reports them with the image's size, and ImageEvent.LOADED marks the moment.",
  section: 'Official plugins',
  tags: ["ImageBox", "ready", "image", "ImageEvent.LOADED"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/ImageBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
