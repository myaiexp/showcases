// d2 example: Globs: changing defaults
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globs: changing defaults',
  summary:
    'A triple glob (`***`) applies across the whole diagram, including nested layers and imports, so it works as a default style: one line fills every shape and a connection glob colours every connection.',
  section: 'Globs',
  tags: ['globs', 'defaults', 'triple glob'],
  docs: ['repo/docs/tour/globs.md', 'repo/static/d2/defaults.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
