// Zod example: Prefault goes in as input, default comes out as output
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Prefault goes in as input, default comes out as output',
  summary:
    'A schema turns text into its length. With a default of 0 a missing value gives 0 straight away. With a prefault of "tuna" the text goes through the schema and gives 4, so a prefault has the schema\'s input type and a default its output type.',
  section: 'Defaults, catch and more',
  tags: ['prefault', 'default', 'transform'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
