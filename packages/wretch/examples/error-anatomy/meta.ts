// What an error carries example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What an error carries',
  summary:
    'When a request fails, the handler receives an error object. It holds the status, the address that was asked, the server\'s own explanation as its message, and the whole response with its headers. Watch each field change as different failures arrive.',
  section: 'Catchers',
  tags: ['WretchError', 'notFound', 'forbidden', 'internalError'],
  docs: ['repo/README.md', 'repo/src/resolver.ts', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
