// Configure once, reuse everywhere: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Configure once, reuse everywhere',
  summary:
    'One client carries the address, a login header, fetch options and a rule for 403 answers. Every request made from it inherits all of that, and each call can add its own header on top. The envelope shows what each request carried; the 403 is handled in one place.',
  section: 'Motivation',
  tags: ['auth', 'options', 'resolve', 'forbidden', 'headers', 'url', 'immutable'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
