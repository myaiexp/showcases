// Zod example: Make a compile that cannot fall back fail loudly
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Make a compile that cannot fall back fail loudly',
  summary:
    "By default z.compile() quietly hands back the original schema when it cannot compile. With { strict: true } it throws instead, naming the reason: ZodCompileAsyncError for async schemas and ZodCompileUnsupportedError for everything else. Use it to prove a hot-path schema really compiled.",
  section: 'AOT compilation',
  tags: ['z.compile', 'strict', 'ZodCompileAsyncError', 'ZodCompileUnsupportedError'],
  docs: ['repo/packages/docs/content/compile.mdx', 'repo/packages/docs/content/blog/introducing-z-compile.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
