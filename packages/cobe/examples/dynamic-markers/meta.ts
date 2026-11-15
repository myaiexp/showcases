// cobe example: Dynamic Markers recipe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dynamic markers',
  summary:
    'Orange dots appear on the globe one city at a time, and a counter shows how many there are. The markers array is replaced by a longer copy, and update({ markers }) draws it each frame. After the last city the list resets.',
  section: 'Recipes',
  tags: ['markers', 'update', 'phi'],
  docs: ['repo/website/app/components/Recipes.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});
