// ky example: form-data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Send a form with FormData',
  summary:
    'Web forms, and file uploads in particular, are not sent as JSON: each field travels as its own labelled part of one envelope. Hand Ky a FormData as the body and it sends exactly that, with the content-type and the envelope boundary filled in for you. The panel shows the raw text the server received.',
  section: 'Tips',
  tags: ['FormData', 'multipart/form-data', 'body', 'form', 'upload'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
