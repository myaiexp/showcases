// Papa Parse example: step and worker together stream rows from a thread
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stream rows out of a worker',
  summary:
    'Streaming and workers combine: the worker reads a big file in slices and sends the rows back as it goes, so your step function runs on the page while the parsing happens elsewhere. The page stays reactive and nothing has to fit in memory.',
  section: 'FAQ',
  tags: ['worker', 'step', 'chunkSize', 'File', 'complete'],
  docs: ['repo/docs/faq.html', 'repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
