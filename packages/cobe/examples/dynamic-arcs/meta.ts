// cobe example: the Dynamic Markers pattern applied to arcs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dynamic arcs',
  summary:
    'Blue arcs grow out of London one destination at a time, with a counter of how many are drawn. As the recipe says the markers pattern works for arcs: a longer arcs array goes to update({ arcs }) each frame. After the last city the arcs clear.',
  section: 'Recipes',
  tags: ['arcs', 'arcColor', 'arcWidth', 'arcHeight', 'update'],
  docs: ['repo/website/app/components/Recipes.tsx', 'pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
