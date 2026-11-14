// When the connection itself fails example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'When the connection itself fails',
  summary:
    'A failure can mean the server said no (a 500 with a status), or that no answer ever came, such as a dropped connection. .internalError() handles the first and .fetchError() the second, so the app can tell "broken" from "offline".',
  section: 'Catchers',
  tags: ['fetchError', 'internalError', 'json'],
  docs: ['repo/README.md', 'repo/src/types.ts', 'repo/src/resolver.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
