// vega example: Type: Compare with Signals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Type: Compare with Signals',
  summary:
    'Two bar rows sorted by Compare objects: one whose field and order come from select inputs, the other sorted by group and then by size in descending order.',
  section: 'Types',
  tags: ['types.Compare', 'transform.collect.sort', 'transform.window'],
  docs: ['repo/docs/docs/types.md', 'repo/docs/docs/transforms/collect.md', 'repo/docs/docs/transforms/window.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
