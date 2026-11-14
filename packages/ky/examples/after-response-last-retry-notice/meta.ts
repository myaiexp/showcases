// ky example: after-response-last-retry-notice
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'afterResponse: warn on the last try',
  summary:
    'Telling a user about every hiccup is noise, but telling them when Ky is about to give up is useful. An afterResponse hook knows which try it is looking at (retryCount) and what the limit is, so it can show a notice only when the last try fails.',
  section: 'Hooks',
  tags: ['afterResponse', 'retryCount', 'retry.limit', 'notification'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
