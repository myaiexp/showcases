// cobe example: Focus Location recipe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Focus location',
  summary:
    'The globe swings to face one city after another and names the current target. locationToAngles turns latitude and longitude into phi and theta, and each frame moves 8% of the remaining gap. The full view has a button per city.',
  section: 'Recipes',
  tags: ['phi', 'theta', 'update', 'markers'],
  docs: ['repo/website/app/components/Recipes.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});
