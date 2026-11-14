// Zod example: Any key ending in _phone must be a phone number
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Any key ending in _phone must be a phone number',
  summary:
    'A contact has a fixed name plus any number of extra fields. Fields whose names end in _phone must hold a valid phone number; other fields pass untouched. A loose record joined to an object with .and() expresses that pattern.',
  section: 'Records, maps, sets and more',
  tags: ['z.looseRecord', 'z.object', 'and', 'z.e164', 'regex'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
