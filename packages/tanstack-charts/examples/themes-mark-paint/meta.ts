// tanstack-charts example: Mark paint, fixed or per row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mark paint, fixed or per row',
  summary:
    'Bars take paint options for their geometry: fill, stroke, strokeWidth, dashes, opacity and corner radius. A fill given as a function of the row is data-driven, so forecast months are dashed and hollow while actual months are solid. Scales stay out of it: this is paint, not a color mapping.',
  section: 'Themes and Styling',
  tags: ['fill', 'stroke', 'strokeDasharray', 'fillOpacity', 'radius'],
  docs: ['repo/docs/guides/themes-and-styling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
