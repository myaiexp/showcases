// d2 example: Classes on connections
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Classes on connections',
  summary:
    'A connection takes a class in two ways: inside its block when it is declared, or afterwards by addressing it with `(a -> b)[0].class`. Both tabs draw the same red dashed connection.',
  section: 'Classes',
  tags: ['classes', 'connection', 'class'],
  docs: ['repo/docs/tour/classes.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
