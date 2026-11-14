// Zod example: Record defaults fill in missing keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Record defaults fill in missing keys',
  summary:
    'A settings record over three known keys where each value has a default. Keys left out of the input are not an error: they appear in the output with the default value, marked as added.',
  section: 'Records, maps, sets and more',
  tags: ['z.record', 'z.enum', 'default'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
