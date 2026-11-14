// Zod example: a form labelled from the metadata stored with .meta()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Form labels from .meta()',
  summary:
    'A form with name, email and age fields. Each label, help line and placeholder was read back from the title, description and examples stored on the schema with .meta(). Click a field to see the exact object it came from.',
  section: 'Metadata and registries',
  tags: ['.meta()', 'title', 'description', 'examples', 'z.object'],
  docs: ['repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
