// Zod example: File upload limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'File upload limits',
  summary:
    'z.file() checks that a value is a File, with a maximum size in bytes and a list of allowed MIME types. The files here are made in code, nothing is uploaded: a small PNG passes, an oversized photo and a PDF are refused with the reason, and a plain text name is not a File at all.',
  section: 'Records, maps, sets and more',
  tags: ['z.file', 'max', 'mime'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
