// plotly-js example: Many scattergl traces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Many scattergl traces",
  summary: "Ten line traces of five thousand points each drawn with scattergl, offset by trace so they stack as bands. A slider sets the trace count and the card shifts the offset.",
  section: "WebGL vs SVG",
  tags: ['scattergl', 'lines', 'showlegend'],
  docs: ['repo/_posts/plotly_js/basic/WebGL/2018-08-07-webgl_many-traces.html'],
  provenance: 'pure',
  added: '2026-11-15',
});
