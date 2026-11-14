// ky example: parseJson receives the request and response
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Know which answer failed to parse',
  summary:
    'When an answer is not valid JSON, the plain parser error says nothing about which request it belonged to. Ky hands your parseJson function the request and response along with the text, so you can log every answer and throw an error that names the address and status.',
  section: 'JSON',
  tags: ['parseJson', 'request', 'response', 'logging'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
