// penrose example: fillRule passthrough
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'fillRule passthrough',
  summary:
    'A pentagram crosses itself, so the rule that decides what is inside matters. `fillRule : "nonzero"` fills the centre; `"evenodd"` leaves a pentagon hole there. Penrose writes no fill-rule of its own, so the passthrough applies.',
  section: 'Passthrough SVG',
  tags: ['fillRule', 'passthrough', 'Polygon'],
  docs: ['repo/packages/docs-site/docs/ref/style/passthrough.md', 'repo/packages/docs-site/docs/ref/style/shapes/polygon.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
