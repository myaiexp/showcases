// observable-plot example: Stack: counting dots without y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: counting dots without y',
  summary:
    'When y is left out, stackY counts rows, so dots stack into an isotype chart of penguins per species, colored by sex or island.',
  section: 'Transform: Stack',
  tags: ['dot', 'stackY'],
  docs: ['repo/docs/transforms/stack.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
