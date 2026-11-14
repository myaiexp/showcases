// ky example: ky.get(url).json() fetches and parses in one line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSON in one line',
  summary:
    'Ask a server for data and get a ready-to-use object back: ky.get(url).json() sends the request, checks that the answer is a success, and parses the JSON. Calling .json() also tells the server which format you want, through the Accept header it adds.',
  section: 'Requests',
  tags: ['ky.get', '.json()', 'accept'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
