// playcanvas example: A 1D blend tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A 1D blend tree',
  summary:
    "A state holds a blend tree of three clips placed at 0, 1 and 3 on one speed parameter. As the value moves, neighbouring clips cross-mix, so idling becomes walking becomes running continuously. Clips are linked as Movement.Idle and so on, and syncAnimations decides whether children of different lengths keep in step.",
  section: 'Animation',
  tags: ['ANIM_BLEND_1D', 'blendTree', 'syncAnimations', 'loadStateGraph', 'setFloat', 'AnimComponentLayer', 'assignAnimation'],
  docs: ['repo/docs/user-manual/animation/blend-trees.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
