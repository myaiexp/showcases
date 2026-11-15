// Zod example: z.custom() with no function checks nothing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'z.custom() with no function checks nothing',
  summary:
    'A schema made by z.custom() with no function says yes to every value: text, numbers, null, even a missing one. Adding the yes/no function makes it strict. It is a handy placeholder and a risky one to leave in.',
  section: 'Defaults, catch and more',
  tags: ['z.custom'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
