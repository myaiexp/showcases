// g6 example: Hull: convex and concave
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hull: convex and concave',
  summary: 'concavity is Infinity for a convex hull; a finite value gives a concave one that hugs the nodes, tighter as the number falls.',
  section: 'Plugin',
  tags: ['hull', 'concavity', 'members'],
  docs: ['repo/packages/site/docs/manual/plugin/Hull.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
