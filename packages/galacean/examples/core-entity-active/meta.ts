// galacean example: Entity: isActive and isActiveInHierarchy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Entity: isActive and isActiveInHierarchy",
  summary:
    "Deactivating a parent switches off every entity below it: isActive is the entity's own switch, isActiveInHierarchy is what the engine actually uses.",
  section: "Core",
  tags: ['Entity', 'isActive', 'isActiveInHierarchy'],
  docs: [
    'repo/docs/en/core/entity.mdx',
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
