// ky example: prefix is applied before baseUrl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'prefix first, then baseUrl',
  summary:
    'When you set both options, Ky first glues the prefix to your input as text, then resolves the result against baseUrl like any other address. That order matters: a prefix without a leading slash stays inside the base, while /v2 or a full address jumps out of it. Try a few prefixes and see where the call lands.',
  section: 'URLs',
  tags: ['prefix', 'baseUrl', 'URL resolution'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
