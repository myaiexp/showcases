// Papa Parse example: two columns with the same name get renamed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two columns, one name',
  summary:
    'When a header repeats, an object would keep only the last value and silently lose the others. Papa renames the repeats (score, score_1, score_2) and tells you what it renamed in meta.renamedHeaders.',
  section: 'Parse config',
  tags: ['header', 'meta.renamedHeaders', 'duplicate headers'],
  docs: ['repo/docs/docs.html', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
