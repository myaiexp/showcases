// Zod example: Record with enum keys: every key is required
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Record with enum keys: every key is required',
  summary:
    'Opening hours for Monday to Wednesday. With z.record(z.enum([...]), ...) every listed day must be present and unknown days are rejected; z.partialRecord() allows leaving days out but still refuses days that are not in the list.',
  section: 'Records, maps, sets and more',
  tags: ['z.record', 'z.partialRecord', 'z.enum'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
