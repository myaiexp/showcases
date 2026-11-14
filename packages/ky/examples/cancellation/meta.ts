// ky example: cancellation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cancel a request',
  summary:
    'Sometimes the answer stops being wanted: the visitor presses Cancel, leaves the page, or asks for something else. Hand Ky a signal from an AbortController and calling abort() cuts the request off at once, whatever stage it is in. Your code gets an AbortError instead of an answer, and the server\'s late reply is dropped.',
  section: 'Tips',
  tags: ['AbortController', 'signal', 'AbortError', 'cancel', 'abort'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
