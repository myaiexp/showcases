// Zod example: Defaults fill in missing settings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Defaults fill in missing settings',
  summary:
    'A settings schema gives each field a default. A saved file that leaves fields out comes back complete, and the output pane marks every value Zod added. A value that is there is kept, and a wrong one is still rejected.',
  section: 'Defaults, catch and more',
  tags: ['default', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
