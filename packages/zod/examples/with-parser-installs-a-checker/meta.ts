// Zod example: Plug in a validator you wrote or generated
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plug in a validator you wrote or generated',
  summary:
    "z.withParser() installs a parser from outside (made at build time, for places where new Function is blocked). The parser returns the finished value, or z.INVALID to hand the input back to Zod, which then builds the usual error. Counters show who answered.",
  section: 'AOT compilation',
  tags: ['z.withParser', 'z.INVALID', 'safeParse'],
  docs: ['repo/packages/docs/content/compile.mdx', 'repo/packages/docs/content/blog/introducing-z-compile.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
