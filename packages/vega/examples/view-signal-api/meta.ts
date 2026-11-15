// vega example: View: Signal API
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Signals and Listeners',
  summary:
    'A slider-bound signal read and written through view.signal, with an addSignalListener / removeSignalListener pair you can toggle; a console inside the chart logs each call and what the derived signal held before and after the run.',
  section: 'View API',
  tags: ['view.signal', 'view.addSignalListener', 'view.removeSignalListener', 'signal.bind'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
