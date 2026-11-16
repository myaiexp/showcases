// leafer-ui example: Film: Resource.loadFilm preloads before adding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: Resource.loadFilm preloads before adding",
  summary:
    "Resource.loadFilm(url) returns a promise for the decoded GIF; the Film is added to the tree only after it resolves, and reuses the resource instead of loading again.",
  section: 'Official plugins',
  tags: ["Resource.loadFilm", "Film", "url"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/film/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
