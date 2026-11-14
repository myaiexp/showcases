// Papa Parse example: fast mode against careful mode on a large input, timed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How much faster is fast mode?',
  summary:
    'The same orders list parsed twice, with fastMode on and off, and timed. Fast mode skips the work of looking for quotes, which pays off as the input grows. Timings differ from run to run.',
  section: 'Parse config',
  tags: ['fastMode', 'performance'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
