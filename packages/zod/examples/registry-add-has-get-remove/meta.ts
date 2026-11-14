// Zod example: the add, has, get, remove and clear of a registry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A registry: add, has, get, remove, clear',
  summary:
    'One typed registry is filled and emptied step by step: add a schema with its metadata, ask whether it is there, read the metadata back, remove it, then clear the whole registry.',
  section: 'Metadata and registries',
  tags: ['z.registry', 'add', 'has', 'get', 'remove', 'clear'],
  docs: ['repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
