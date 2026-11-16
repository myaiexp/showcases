// leafer-ui example: Film: fill with type film instead of url
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: fill with type film instead of url",
  summary:
    "Setting fill to { type: \"film\", url, mode } on a Film plays the GIF as a paint, so the usual fill options (here mode stretch) apply. A fill can be one of several.",
  section: 'Official plugins',
  tags: ["Film", "fill", "type: film", "mode"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
