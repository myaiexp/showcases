// ky example: plain fetch versus Ky on an error answer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plain fetch vs Ky',
  summary:
    'The browser\'s fetch treats any answer as a success, even "not found" or a server crash, so an error page can slip into your code as if it were real data. Ky sends the same request but throws an HTTPError for anything outside 200–299. Switch the server\'s answer and compare.',
  section: 'Usage',
  tags: ['fetch', 'HTTPError', 'response.ok', '.json()'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
