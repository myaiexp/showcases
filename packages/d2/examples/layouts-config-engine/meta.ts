// d2 example: Layout engine set in d2-config
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout engine set in d2-config',
  summary:
    '`layout-engine` in `vars.d2-config` selects the engine from inside the source, so the file carries its own choice. No `layout` option is passed here: the source alone makes this ELK, and the second tab with dagre differs.',
  section: 'Layouts',
  tags: ['layout', 'd2-config', 'elk'],
  docs: ['repo/docs/tour/layouts.md', 'repo/docs/tour/vars.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
