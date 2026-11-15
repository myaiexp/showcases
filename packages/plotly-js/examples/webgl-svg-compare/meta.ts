// plotly-js example: scatter (SVG) against scattergl (WebGL) draw time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scatter (SVG) against scattergl (WebGL) draw time",
  summary: "The same gaussian cloud drawn once as an SVG scatter trace and once as scattergl, timed. A slider sets the point count; SVG slows down as it grows while WebGL does not.",
  section: "WebGL vs SVG",
  tags: ['scatter', 'scattergl', 'react'],
  docs: ['repo/_posts/plotly_js/basic/WebGL/2018-08-07-webgl_plotlyjs_index.html', 'repo/_posts/plotly_js/basic/WebGL/2018-08-07-webgl_100000-points.html'],
  provenance: 'pure',
  added: '2026-11-15',
});
