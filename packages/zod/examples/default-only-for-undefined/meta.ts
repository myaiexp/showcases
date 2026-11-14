// Zod example: A default answers only to missing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A default answers only to missing',
  summary:
    'The default "guest" fills in when the name is missing (undefined), but an explicit null, an empty string or a number still fail or pass on their own. Adding .nullable() first lets null through untouched.',
  section: 'Defaults, catch and more',
  tags: ['default', 'nullable', 'undefined'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
