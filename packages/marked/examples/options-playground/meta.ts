// marked example: Options playground
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Options playground',
  summary:
    'Flip gfm, breaks and pedantic and the page re-renders. A table underneath lists the default of every option from marked.getDefaults() next to the value in use right now.',
  section: 'Options',
  tags: ['gfm', 'breaks', 'pedantic', 'getDefaults'],
  docs: ['repo/docs/USING_ADVANCED.md', 'repo/src/defaults.ts', 'repo/src/MarkedOptions.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
