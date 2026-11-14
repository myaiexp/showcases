// Papa Parse example: chunkSize sets how big each slice of a file is
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Choose the chunk size',
  summary:
    'chunkSize is how many bytes Papa reads at a time. The same file is read three ways: small slices mean many chunk callbacks with a few rows each, big slices mean few callbacks with many rows. Pick it to match the work you do per chunk.',
  section: 'Parse config',
  tags: ['chunkSize', 'chunk', 'File', 'LocalChunkSize'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
