// Zod example: Records that police their keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Records that police their keys',
  summary:
    'A record can check the key names as well as the values: here keys must be lowercase letters. The default z.record() rejects any other key, naming it; z.looseRecord() lets non-matching keys through unchanged and only checks the keys that do match.',
  section: 'Records, maps, sets and more',
  tags: ['z.record', 'z.looseRecord', 'regex', 'invalid_key'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
