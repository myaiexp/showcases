// Papa Parse example: preview reads only the first rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Just the first few rows',
  summary:
    'preview: n stops Papa after n rows, which is how a "here is what your file looks like" step avoids reading everything. meta.truncated tells you whether it stopped early.',
  section: 'Parse config',
  tags: ['preview', 'meta.truncated'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
