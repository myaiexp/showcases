// ky example: form-data-in-hook
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Change a form in a hook',
  summary:
    'A form travels in an envelope whose label names its boundary, so swapping the form inside a hook without touching the label leaves the server reading the wrong envelope. Delete the content-type header before building the new Request, and the browser writes a fresh label that matches the new form. Turn the checkbox off to see the refusal.',
  section: 'Tips',
  tags: ['beforeRequest', 'FormData', 'content-type', 'boundary', 'Request'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
