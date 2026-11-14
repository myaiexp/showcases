// g6 example: Custom behavior: click to add a node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom behavior: click to add a node',
  summary: 'A BaseBehavior subclass registered as a new behavior adds a node where the canvas is clicked, in a fill read from its options and changed with updateBehavior. The card clicks the canvas in different colours.',
  section: 'Behavior',
  tags: ['BaseBehavior', 'register', 'ExtensionCategory.BEHAVIOR', 'CanvasEvent.CLICK', 'custom', 'behavior'],
  docs: ['repo/packages/site/docs/manual/behavior/custom-behavior.en.md', 'repo/packages/site/common/manual/custom-extension/behavior/implement-behaviors.md', 'repo/packages/site/docs/api/behavior.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
