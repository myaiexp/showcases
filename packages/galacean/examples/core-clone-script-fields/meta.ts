// galacean example: Clone: script fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clone: script fields",
  summary:
    "A cloned script copies its fields by assignment: a boolean or number by value, but a Vector3 field by reference, so editing the clone's vector changes the original's too.",
  section: "Core",
  tags: ['Script', 'Entity', 'clone', 'Vector3'],
  docs: [
    'repo/docs/en/core/clone.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
