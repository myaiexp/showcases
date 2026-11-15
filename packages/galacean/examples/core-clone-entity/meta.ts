// galacean example: Clone: entity.clone()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clone: entity.clone()",
  summary:
    "clone() copies an entity with its children and components, scripts included: one template entity with a turning child is cloned into a growing ring.",
  section: "Core",
  tags: ['Entity', 'clone', 'Script'],
  docs: [
    'repo/docs/en/core/clone.mdx',
    'repo/docs/en/core/entity.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
