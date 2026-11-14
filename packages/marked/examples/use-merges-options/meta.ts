// marked example: What use() merges and what it replaces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What use() merges and what it replaces',
  summary:
    'Stack three use() layers with the switches. A plain option such as breaks is overwritten by the last layer that sets it, while renderer overrides from every layer are merged together; where two layers override bold, the last one wins.',
  section: 'marked.use()',
  tags: ['marked.use', 'merge', 'renderer', 'breaks'],
  docs: ['repo/docs/USING_PRO.md', 'repo/src/Instance.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
