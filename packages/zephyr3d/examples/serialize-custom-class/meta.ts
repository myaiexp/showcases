// zephyr3d example: Register a custom serializable class
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Register a custom serializable class',
  summary:
    'A plain GameSettings class becomes serializable once registered with registerClass: a name, a constructor and getProps accessors that read and write value lanes. Every two seconds the settings go through serializeObject, an edit to the JSON, and deserializeObject, and the ring spins at the restored speed.',
  section: 'Advanced Topics',
  tags: ['registerClass', 'SerializableClass', 'serializeObject', 'deserializeObject'],
  docs: ['repo/apps/doc/web/en/serialization.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
