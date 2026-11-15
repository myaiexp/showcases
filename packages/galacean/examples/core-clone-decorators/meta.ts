// galacean example: Clone: clone decorators
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clone: clone decorators",
  summary:
    "ignoreClone, assignmentClone, shallowClone and deepClone on four script fields, then the clone's elements are changed to show which ones still share the original's objects.",
  section: "Core",
  tags: ['ignoreClone', 'assignmentClone', 'shallowClone', 'deepClone', 'Script'],
  docs: [
    'repo/docs/en/core/clone.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
