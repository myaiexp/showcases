// galacean example: Entity: create, add, remove, destroy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Entity: create, add, remove, destroy",
  summary:
    "The life of an entity step by step: new Entity (detached, nowhere in the scene), addChild (it appears), removeChild (it vanishes but stays alive), destroy (gone for good).",
  section: "Core",
  tags: ['Entity', 'addChild', 'removeChild', 'destroy', 'createChild'],
  docs: [
    'repo/docs/en/core/entity.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
