// ky example: ky-retry-delay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry after the time the body gives',
  summary:
    'Some APIs answer 200 and put the waiting time in the body: \'slow down, come back in 2 seconds\'. Return ky.retry with a delay from an afterResponse hook and Ky waits exactly that long, ignoring its usual growing pauses.',
  section: 'Forced retries',
  tags: ['ky.retry', 'delay', 'afterResponse', 'timeline'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
