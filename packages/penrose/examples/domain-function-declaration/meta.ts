// penrose example: Declaring functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Declaring functions',
  summary:
    '`function addVector(Vector v1, Vector v2) -> Vector` declares a function: Substance applies it with `:=`, and Style matches it with the same `:=` in a `where` clause. The sum vector is drawn at the head of the two inputs laid end to end.',
  section: 'Domain',
  tags: ['function', ':=', 'where', 'Line'],
  docs: ['repo/packages/docs-site/docs/ref/domain/functions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
