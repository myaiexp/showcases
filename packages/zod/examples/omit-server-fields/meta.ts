// Zod example: a create schema made by omitting server-controlled fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A create form with .omit()",
  summary:
    "A product has an id and a creation date that only the server may set. .omit() makes the create-form schema without them, so a client that tries to send its own id has it dropped before it can do harm.",
  section: 'Objects',
  tags: ['.omit', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
