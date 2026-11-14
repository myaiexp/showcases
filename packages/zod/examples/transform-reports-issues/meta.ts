// Zod example: A transform that can say no
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A transform that can say no',
  summary:
    "Inside a transform you get a ctx. Push an issue onto ctx.issues and return z.NEVER, and the parse fails with your message; return a value and it succeeds. Typed text becomes a number only if it really is one.",
  section: 'Transforms and pipes',
  tags: ['transform', 'ctx.issues', 'z.NEVER', 'issues'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
