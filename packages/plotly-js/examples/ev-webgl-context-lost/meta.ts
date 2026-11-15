// plotly-js example: plotly_webglcontextlost
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'plotly_webglcontextlost',
  summary:
    'A scattergl plot reports plotly_webglcontextlost when the browser takes its WebGL context; a button forces the loss so the handler can be seen.',
  section: 'Event Handlers',
  tags: ['plotly_webglcontextlost', 'scattergl', 'WEBGL_lose_context'],
  docs: ['repo/_posts/plotly_js/chart-events/events/2018-10-04-webglcontextlost.html'],
  provenance: 'pure',
  added: '2026-11-15',
});
