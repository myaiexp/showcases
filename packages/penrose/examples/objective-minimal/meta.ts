// penrose example: minimal: pushing a value down as far as it goes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "minimal: pushing a value down as far as it goes",
  summary:
    'A circle with nothing to steer it stays where it was sampled. `encourage minimal(a.icon.center[0])` drives its x coordinate down until the canvas edge stops it, and `minimal(a.icon.r)` shrinks it to its lower bound.',
  section: "Objective Functions",
  tags: ['minimal', 'encourage', 'objective'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
