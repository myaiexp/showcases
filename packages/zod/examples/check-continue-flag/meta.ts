// Zod example: .check(): decide if later rules still run
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '.check(): decide if later rules still run',
  summary:
    "check() hands you the raw issue list to push onto. An issue pushed without continue stops later refinements from running; push it with continue: true and the schema goes on checking, so a lowercase rule further down still gets its say.",
  section: 'Refinements',
  tags: ['check', 'ctx.issues', 'continue', 'refine'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
