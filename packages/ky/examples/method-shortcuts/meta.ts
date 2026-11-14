// ky example: the method shortcuts ky.get to ky.query
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One shortcut per method',
  summary:
    'A web request says what you want to do: read, create, replace, change, delete, check, or search. Ky has a shortcut for each (ky.get, ky.post, ky.put, ky.patch, ky.delete, ky.head and ky.query) that sets the method for you. Pick one and watch which method reaches the server.',
  section: 'Requests',
  tags: ['ky.get', 'ky.post', 'ky.put', 'ky.patch', 'ky.delete', 'ky.head', 'ky.query', 'method'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
