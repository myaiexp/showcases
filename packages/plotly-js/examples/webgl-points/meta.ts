// plotly-js example: scattergl with a hundred thousand points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scattergl with a hundred thousand points",
  summary: "A gaussian cloud drawn by the scattergl trace, which renders on the GPU. A select raises the point count from 10 thousand to a million, and a toggle swaps the docs' two marker styles.",
  section: "WebGL vs SVG",
  tags: ['scattergl', 'marker.line', 'marker.color'],
  docs: ['repo/_posts/plotly_js/basic/WebGL/2018-08-07-webgl_100000-points.html', 'repo/_posts/plotly_js/basic/WebGL/2018-08-07-webgl_1mill-points.html'],
  provenance: 'pure',
  added: '2026-11-15',
});
