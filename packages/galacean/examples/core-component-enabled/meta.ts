// galacean example: Component: enabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Component: enabled",
  summary:
    "A DirectLight component switched off and on with its enabled property: the entity stays, the light's effect goes away.",
  section: "Core",
  tags: ['Component', 'enabled', 'DirectLight'],
  docs: [
    'repo/docs/en/core/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
