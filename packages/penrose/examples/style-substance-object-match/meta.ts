// penrose example: Matching one named Substance object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Backticks match one Substance object by name',
  summary:
    'A name in backticks, as in `forall Set `B``, is a Substance object rather than a style variable, so the block runs for that one set only. The generic block draws every set, the backtick block turns B gold and the last one rings D, which is matched by its name together with the Subset relation it holds.',
  section: 'Style: Selectors',
  tags: ['forall', 'backticks', 'Substance object', 'override'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/selectors.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
