// ky example: the readme's usage pair, ky.post against plain fetch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Posting JSON: Ky against fetch',
  summary:
    'Sending data to a server with plain fetch takes boilerplate: turn the object into text, set the method, label the content, check the answer, then parse it. Ky does all of it in one line. Both calls send the same request: same method, same body, same content type.',
  section: 'Usage',
  tags: ['ky.post', 'json', 'fetch', 'content-type'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
