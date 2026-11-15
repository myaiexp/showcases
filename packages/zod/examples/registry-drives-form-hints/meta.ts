// Zod example: a custom registry of form hints beside the rules
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A registry of form hints',
  summary:
    'Labels, placeholders and help text live in a registry of your own, next to rules that stay in the schema. A sign-up form is built from both and shows each field\'s error as the text changes.',
  section: 'Metadata and registries',
  tags: ['z.registry', '.register()', 'registry.get', 'z.coerce.number'],
  docs: ['repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
