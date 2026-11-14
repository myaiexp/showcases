// Hold every request for a moment: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hold every request for a moment',
  summary:
    'delay(ms) makes every request wait before it leaves, which is handy for trying out loading spinners or for spacing requests out. The timeline shows the call mark, then a gap, then the bar; the slider changes the wait.',
  section: 'Middlewares',
  tags: ['delay', 'middlewares'],
  docs: ['repo/README.md', 'repo/src/middlewares/delay.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
