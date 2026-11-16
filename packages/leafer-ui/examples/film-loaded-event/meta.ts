// leafer-ui example: Film: ImageEvent.LOADED fires when the GIF is ready
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: ImageEvent.LOADED fires when the GIF is ready",
  summary:
    "film.once(ImageEvent.LOADED, ...) runs when the GIF has been decoded; the handler here reports the decoder's frame count and shows the element's size.",
  section: 'Official plugins',
  tags: ["Film", "ImageEvent.LOADED", "once"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/film/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
