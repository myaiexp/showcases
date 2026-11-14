// ky example: hooks-lifecycle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hooks: where each one runs',
  summary:
    'A request goes through several stages, and a hook is your own function that Ky calls at one of them: to tweak the request on the way out, look at each answer, or reword the final error. Run a flaky forecast request and watch each hook light up where it fires, and what it did.',
  section: 'Hooks',
  tags: ['hooks', 'init', 'beforeRequest', 'afterResponse', 'beforeRetry', 'beforeError'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
