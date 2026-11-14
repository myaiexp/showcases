// Same header, two spellings: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Same header, two spellings',
  summary:
    'Header names are not case sensitive, but wretch keeps your headers in a plain object where "content-type" and "Content-Type" are two different keys. Both get sent, the browser glues their values together as "application/json, application/json", and a strict server refuses the request. The panel lists what was sent and the one value the server read.',
  section: 'Limitations',
  tags: ['headers', 'json', 'content', 'Headers'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
