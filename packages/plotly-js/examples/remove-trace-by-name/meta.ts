// plotly-js example: Remove a trace by its name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Remove a trace by its name',
  summary:
    'Five named series; pick one from the select and its trace index is looked up in the graph\'s data before deleteTraces removes it.',
  section: 'Remove Trace',
  tags: ['deleteTraces', 'data', 'name', 'addTraces'],
  docs: ['repo/_posts/plotly_js/chart-events/remove-trace/2015-08-15-remove-trace-example.html'],
  provenance: 'pure',
  added: '2026-11-15',
});
