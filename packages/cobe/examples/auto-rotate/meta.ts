// cobe example: Auto Rotate recipe with three speeds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto rotate',
  summary:
    'Three globes turn side by side, each captioned with its step: 0.002, 0.005 and 0.01 radians of phi per frame. A requestAnimationFrame loop adds the step to phi and calls update({ phi }). The full view adds a multiplier for all three.',
  section: 'Recipes',
  tags: ['phi', 'update', 'requestAnimationFrame'],
  docs: ['repo/website/app/components/Recipes.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});
