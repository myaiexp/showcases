// plotly-js example: Triggering hover events from code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Triggering hover events from code',
  summary:
    'A Go button hovers two random points with Plotly.Fx.hover while a plotly_beforehover handler returning false blocks the real mouse.',
  section: 'Hover Events',
  tags: ['Fx.hover', 'plotly_beforehover', 'plotly_hover'],
  docs: ['repo/_posts/plotly_js/chart-events/callbacks-hover/2015-04-09-hover-manual.html'],
  provenance: 'pure',
  added: '2026-11-15',
});
