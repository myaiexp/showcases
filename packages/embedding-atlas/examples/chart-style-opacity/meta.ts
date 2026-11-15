// embedding-atlas example: fillOpacity, strokeOpacity, opacity on bubbles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fill, stroke and layer opacity",
  summary:
    "Bubbles per source and topic overlap, and the style decides how: fillOpacity makes the fill see-through, strokeOpacity fades only the ring, opacity fades the whole mark, and fillColor null removes the fill.",
  section: "Charts",
  tags: ['style', 'fillOpacity', 'strokeOpacity', 'opacity', 'fillColor: null', 'mark: point'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
