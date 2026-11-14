// g6 example: Export image: viewport or overall mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Export image: viewport or overall mode',
  summary: "mode: 'viewport' exports what the canvas shows, panned and zoomed. mode: 'overall' exports the whole graph at its bounds. The graph is zoomed so part of it is off screen.",
  section: 'API',
  tags: ['toDataURL', 'DataURLOptions', 'mode', 'viewport', 'overall'],
  docs: [
    'repo/packages/site/docs/api/export-image.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
