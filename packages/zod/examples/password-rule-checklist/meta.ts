// Zod example: Password rule checklist
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Password rule checklist',
  summary:
    "A password field with four refine rules, each with its own message. As you type, every rule lights up green or stays red, because Zod keeps running all the rules and reports each one that fails.",
  section: 'Refinements',
  tags: ['refine', 'error', 'issues', 'safeParse'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
