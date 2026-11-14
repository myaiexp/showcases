// Papa Parse example: step gives you one row at a time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rows arrive one at a time',
  summary:
    'Give Papa a step function and it stops handing back one big result: your function is called for each row as it is parsed. Here the parse is paused after every row so you can watch the table grow.',
  section: 'Parse config',
  tags: ['step', 'parser.pause', 'parser.resume', 'complete'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
