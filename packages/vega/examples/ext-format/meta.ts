// vega example: Extensibility: Data Format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensibility: Custom Data Format',
  summary:
    'A key=value text format added with vega.formats: one inline string is parsed twice with different format options (a plain read and a scale of two) and drawn as paired bars.',
  section: 'Extensibility',
  tags: ['extensibility.formats', 'data.format.type', 'data.values'],
  docs: ['repo/docs/docs/api/extensibility.md', 'repo/docs/docs/data.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
