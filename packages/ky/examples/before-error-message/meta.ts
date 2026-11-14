// ky example: before-error-message
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'beforeError: say it in plain words',
  summary:
    'When a request fails, Ky\'s own message says only \'Request failed with status code 403\'. The server usually knows more. A beforeError hook runs just before the error reaches your code, so it can swap in the server\'s own explanation.',
  section: 'Hooks',
  tags: ['beforeError', 'error.data', 'HTTPError', 'message'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
