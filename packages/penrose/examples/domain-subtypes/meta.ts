// penrose example: Subtypes: Hydrogen and Oxygen are Atoms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subtypes: Hydrogen and Oxygen are Atoms',
  summary:
    'Domain declares `type Hydrogen <: Atom` and `type Oxygen <: Atom`. One `forall Atom a` Style block draws every atom as a circle, and two narrower blocks (`forall Hydrogen h`, `forall Oxygen o`) restyle just their own subtype.',
  section: 'Domain',
  tags: ['type', 'subtype', '<:', 'forall', 'override'],
  docs: ['repo/packages/docs-site/docs/ref/domain/types.md', 'repo/packages/core/src/lib/Constraints.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
