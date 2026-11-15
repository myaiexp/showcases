// galacean example: Entity: finding entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Entity: finding entities",
  summary:
    "A tree of named entities and the lookups that reach into it: scene.findEntityByName, findEntityByPath, entity.getChild, findByName (deep) and findByPath. The entity each query returns lights up.",
  section: "Core",
  tags: ['Entity', 'findByName', 'findByPath', 'getChild', 'findEntityByName', 'findEntityByPath'],
  docs: [
    'repo/docs/en/core/entity.mdx',
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
