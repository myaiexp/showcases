// Zod example: Default or prefault: tidy the fallback too?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Default or prefault: tidy the fallback too?',
  summary:
    'The same fallback text "  tuna  " is given to a schema that trims and capitalises. As a default it comes out untouched. As a prefault it is treated like typed input and comes out as TUNA. Real input is tidied the same either way.',
  section: 'Defaults, catch and more',
  tags: ['default', 'prefault', 'trim', 'toUpperCase'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
