// leafer-ui example: Film: editable in the graphic editor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: editable in the graphic editor",
  summary:
    "In an App with the editor, a Film is selected, moved and resized like any element (editable: true), and keeps playing; clicking it toggles playback.",
  section: 'Official plugins',
  tags: ["Film", "App", "editable", "editor", "togglePlay"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/film/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
