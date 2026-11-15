// penrose example: Mixing the labelling statements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mixing the labelling statements',
  summary:
    'All three labelling statements in one program: `AutoLabel All` names the sets, `Label B "the second"` replaces one name with a phrase, and `NoLabel C` leaves one set bare. Style prints whatever label each set ended up with.',
  section: 'Substance',
  tags: ['AutoLabel', 'Label', 'NoLabel', 'label'],
  docs: [
    'repo/packages/docs-site/docs/ref/substance/statements.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
