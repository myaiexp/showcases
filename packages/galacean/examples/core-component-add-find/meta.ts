// galacean example: Component: add and find
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Component: add and find",
  summary:
    "addComponent builds an entity's behaviour; getComponent returns the first match, getComponents every match on one entity and getComponentsIncludeChildren every match below it.",
  section: "Core",
  tags: ['addComponent', 'getComponent', 'getComponents', 'getComponentsIncludeChildren'],
  docs: [
    'repo/docs/en/core/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
