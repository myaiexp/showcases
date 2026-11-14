// Papa Parse example: a worker keeps the page moving, a page parse freezes it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A worker keeps the page responsive',
  summary:
    'A big parse on the page itself freezes everything: no scrolling, no clicking, animations stop. With worker: true the parsing happens on another thread and the spinner never stalls. Try both in the full view and watch the longest freeze.',
  section: 'FAQ',
  tags: ['worker', 'complete', 'Papa.parse', 'multi-threading'],
  docs: ['repo/docs/faq.html', 'repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
