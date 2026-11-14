// Papa Parse example: worker true parses on a background thread
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Parse in a background worker',
  summary:
    'With worker: true the parsing runs on a second thread, so the page stays free to scroll and click. The price: Papa.parse no longer returns the rows, they arrive later in your complete callback. Papa.WORKERS_SUPPORTED tells you whether the browser can do it.',
  section: 'Parse config',
  tags: ['worker', 'complete', 'Papa.WORKERS_SUPPORTED', 'Papa.parse'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
