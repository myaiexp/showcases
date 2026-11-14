// Zod example: Messages that name the field from its title
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Messages that name the field from its title',
  summary:
    'A global error map receives iss.schema, the schema that owns the issue even when a check raised it. Reading a registry title from it turns every failure into "Password is invalid.", "Email address is invalid." and so on.',
  section: 'Customizing errors',
  tags: ['z.config', 'customError', 'iss.schema', 'z.registry', 'register'],
  docs: ['repo/packages/docs/content/error-customization.mdx', 'repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
