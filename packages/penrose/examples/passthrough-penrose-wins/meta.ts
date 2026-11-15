// penrose example: Penrose overrides a passthrough
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Penrose overrides a passthrough',
  summary:
    '`fill : "#d94f4f"` names an SVG property that Penrose already writes from `fillColor`, so the green fill wins. The same goes for `fillOpacity`. A property Penrose does not write, such as `opacity`, passes through.',
  section: 'Passthrough SVG',
  tags: ['passthrough', 'fillColor', 'fill', 'opacity'],
  docs: ['repo/packages/docs-site/docs/ref/style/passthrough.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
