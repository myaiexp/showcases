// galacean example: Script: reaching entities and components
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: reaching entities and components",
  summary:
    "A script on a robot finds its parts through this.entity: getChild by index, findByName and findByPath to reach deep children, getComponent for a sibling script, and transform.setRotation to move them.",
  section: "Script",
  tags: ['Script', 'entity', 'getChild', 'findByName', 'findByPath', 'getComponent', 'setRotation'],
  docs: [
    'repo/docs/en/script/class.mdx',
    'repo/docs/en/core/entity.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
