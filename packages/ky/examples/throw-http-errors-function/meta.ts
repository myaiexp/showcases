// ky example: throwHttpErrors as a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Throw only on server errors',
  summary:
    'A page that does not exist (404) is a normal thing to handle, while a crashed server (500) is a real emergency. Give throwHttpErrors a function that receives the status and answers "should this throw?", and Ky throws only for the cases you pick. Compare it with the default and with turning throwing off.',
  section: 'HTTP errors',
  tags: ['throwHttpErrors', 'function', '404', '5xx', 'HTTPError'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
