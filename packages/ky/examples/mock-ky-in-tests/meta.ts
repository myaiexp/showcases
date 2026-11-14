// ky example: mock Ky in tests with a custom fetch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mock Ky in tests: no server at all',
  summary:
    'Tests that call a real server are slow and break when the network does. Give Ky a fetch option that returns a hand-made Response and your code runs exactly as in production, with no server and no traffic. The wire here stays empty while the code still gets its data, its server error or its network failure.',
  section: 'FAQ',
  tags: ['fetch', 'ky.create', 'testing', 'mock', 'Response'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
