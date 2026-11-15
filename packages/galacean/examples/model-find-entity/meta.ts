// galacean example: Model: find parts by name and path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: find parts by name and path",
  summary:
    "A model added as a scene root is searched with scene.findEntityByName, scene.findEntityByPath and entity.findByName; the part found pulses.",
  section: "Model",
  tags: ['findEntityByName','findEntityByPath','findByName','Scene'],
  docs: [
    'repo/docs/en/graphics/model/use.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
