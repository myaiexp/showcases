// penrose example: Subtyping a type declared earlier
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subtyping a type declared earlier',
  summary:
    'A subtype relation can be written without `type` once both types exist: `Hydrogen <: Atom`. The two tabs declare the same Domain in both spellings, and the diagram does not change.',
  section: 'Domain',
  tags: ['type', 'subtype', '<:'],
  docs: ['repo/packages/docs-site/docs/ref/domain/types.md', 'repo/packages/core/src/lib/Constraints.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
