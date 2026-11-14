// Papa Parse example: abort a streaming parse once the row is found
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stop reading once you have the row',
  summary:
    'Looking for one order in a long file? Call parser.abort() from your step function the moment you find it. Papa stops there, reports meta.aborted, and never reads the rest of the text.',
  section: 'Parse config',
  tags: ['step', 'parser.abort', 'meta.aborted', 'meta.cursor'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
