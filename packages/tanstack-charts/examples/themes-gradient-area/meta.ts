// tanstack-charts example: Linear gradient area fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Linear gradient area fill',
  summary:
    'A gradient is a chart resource: it is declared in gradients and referenced as url(#id) from a mark fill. This area fades from transparent at the baseline to opaque at the top, with a line on top. idPrefix keeps the resource id unique when several charts share a page.',
  section: 'Themes and Styling',
  tags: ['gradients', 'url(#id)', 'idPrefix', 'areaY', 'clip'],
  docs: ['repo/docs/guides/themes-and-styling.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
