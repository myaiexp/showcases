// ky example: a per-request baseUrl overrides the instance's
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One call that leaves the base address',
  summary:
    'A client made with a baseUrl sends every short address to that server. When one call must go elsewhere, such as your own site\'s status page, set baseUrl on that call: an empty string means the page you are on, or give another address. The ledger shows which host each call reached.',
  section: 'Instances',
  tags: ['ky.create', 'baseUrl', 'override', 'empty string'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
