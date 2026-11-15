// penrose example: A subtype matches its supertype
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A subtype matches its supertype',
  summary:
    '`predicate Bond(Atom, Atom)` accepts Hydrogen, Oxygen and plain Atom arguments, because each subtype matches its supertype. Substance bonds an Oxygen to an Atom and to a Hydrogen, and the one Style block draws both bonds.',
  section: 'Domain',
  tags: ['subtype', 'predicate', 'where', 'matching'],
  docs: ['repo/packages/docs-site/docs/ref/domain/types.md', 'repo/packages/docs-site/docs/ref/substance/statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
