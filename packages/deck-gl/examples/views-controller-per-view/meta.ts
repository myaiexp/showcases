// deck-gl example: A controller per view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A controller per view",
  summary:
    "Two MapViews with different controller options: the left only zooms, the right only pans, both writing one shared view state.",
  section: "Views",
  tags: ["controller", "dragPan", "scrollZoom", "views"],
  docs: ["repo/docs/api-reference/core/view.md", "repo/docs/api-reference/core/controller.md", "repo/docs/developer-guide/views.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
