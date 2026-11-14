// g6 example: Custom edge: lifecycle hooks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom edge: lifecycle hooks',
  summary:
    'A custom edge reports onCreate, onUpdate and onDestroy as edges are added, updated and removed.',
  section: 'Edge',
  tags: ['register', 'onCreate', 'onUpdate', 'onDestroy'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/custom-edge.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
