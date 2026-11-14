// Papa Parse example: tidying messy column names with transformHeader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tidy messy column names',
  summary:
    'Exported headers come with stray spaces, capitals and brackets. transformHeader runs on each name as Papa reads it (it gets the name and its position), so the keys you code against come out clean.',
  section: 'Parse config',
  tags: ['transformHeader', 'header', 'meta.fields'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
