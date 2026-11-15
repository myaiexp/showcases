// d2 example: Overrides: redeclaring merges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overrides: redeclaring merges',
  summary:
    'Declaring a shape again merges the new declaration into the old one, and the latest explicit label wins. The editor-name example redeclares one key with different casing five times; the container example adds children by redeclaring.',
  section: 'Overrides',
  tags: ['overrides', 'merge', 'label'],
  docs: ['repo/docs/tour/overrides.md', 'repo/static/d2/overrides-1.d2', 'repo/static/d2/overrides-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
