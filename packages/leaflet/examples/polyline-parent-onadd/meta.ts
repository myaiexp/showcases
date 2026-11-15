// leaflet example: Reusing the parent's onAdd
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reusing the parent's onAdd",
  summary:
    `A subclass does not have to write onAdd from scratch: it can run the parent's onAdd and add to it before or after. RedPolyline sets options.color and then calls super.onAdd, so it draws red whatever colour it was given. GlowPolyline calls super.onAdd first, because only then does getElement() return the path, and adds a CSS class to it. A plain Polyline with the same blue option sits beside them; the log shows what each onAdd saw.`,
  section: "Extending Leaflet",
  tags: ["Polyline", "onAdd", "super.onAdd", "getElement", "options.color"],
  docs: [
    'repo/docs/examples/extending-2-layers/index.md',
    'repo/src/layer/vector/Polyline.js',
    'repo/src/layer/vector/Path.js',
    'repo/src/layer/Layer.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
