// leafer-ui example: Visible: false keeps the layout space, 0 gives it up
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Visible: false keeps the layout space, 0 gives it up",
  summary: "visible = false hides an element but a Flow still reserves its space; visible = 0 behaves like display: none and the neighbours close up. The select switches the middle box.",
  section: "Appearance",
  tags: ["visible","Flow","Box"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/visible.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
