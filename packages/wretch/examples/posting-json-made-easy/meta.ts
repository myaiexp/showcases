// Posting JSON without the boilerplate: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Posting JSON without the boilerplate',
  summary:
    'With plain fetch, sending an object means spelling out the method, a content-type header and JSON.stringify. wretch\'s .post(object) does all three. The two envelopes show what the server received: the same request, from very different amounts of code.',
  section: 'Motivation',
  tags: ['fetch', 'post', 'json', 'headers', 'serialization'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
