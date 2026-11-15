// plotly-js example: Annotations: positions on a log axis are log10 values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Annotations: positions on a log axis are log10 values',
  summary: 'A line on a log y axis with an annotation pointing at 1000: its y is given as log10(1000); a slider moves it by powers of ten.',
  section: 'Text and Annotations',
  tags: ['annotations.y', 'yaxis.type log', 'Math.log10'],
  docs: ['repo/_posts/plotly_js/fundamentals/annotations/2024-02-01-annotation-log-axis.html'],
  provenance: 'pure',
  added: '2026-11-15',
});
