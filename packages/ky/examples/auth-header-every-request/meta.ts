// ky example: auth-header-every-request
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A login header on every request',
  summary:
    'Adding the login header by hand to each call is how one gets forgotten. Put a beforeRequest hook on the client once and every call it makes carries the header, reading the current token each time, so a new login is picked up straight away.',
  section: 'FAQ',
  tags: ['beforeRequest', 'authorization', 'ky.create', 'instance'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
