// Pretext example: default word-break vs { wordBreak: 'keep-all' } for CJK text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'word-break: keep-all',
  summary:
    'Korean, Chinese and Japanese paragraphs are laid out with the default breaking and with { wordBreak: \'keep-all\' }, each painted with the matching CSS word-break, with line counts side by side.',
  section: 'Measure height',
  tags: ['wordBreak', 'keep-all', 'CJK', 'prepare'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
