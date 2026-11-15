// globe-gl example: Layout: a see-through background
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: a see-through background",
  summary:
    "backgroundColor accepts a colour with alpha. With rgba(0,0,0,0) and the renderer's default alpha: true, the canvas is see-through and the page's own CSS gradient and grid show around the globe.",
  section: "Container Layout",
  tags: ["backgroundColor", "rendererConfig", "alpha"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
