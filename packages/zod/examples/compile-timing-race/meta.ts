// Zod example: Plain against compiled: a timing race
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plain against compiled: a timing race',
  summary:
    "The same schema, plain and compiled with z.compile(), parses the same data thousands of times and each total is timed. Compiled is usually several times faster on good data (a cold first run can be closer); on bad data both paths still run the standard parser to build the error, so the gap shrinks.",
  section: 'AOT compilation',
  tags: ['z.compile', 'safeParse', 'performance.now'],
  docs: ['repo/packages/docs/content/compile.mdx', 'repo/packages/docs/content/blog/introducing-z-compile.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
