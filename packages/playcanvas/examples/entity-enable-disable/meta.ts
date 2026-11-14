// playcanvas example: Enabling and disabling entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Enabling and disabling entities",
  summary: "Disabling a parent switches off everything below it, and enabled reads false for its children while it is off. Setting a child under a disabled parent is remembered and takes effect when the parent returns. Component enabled flags work alone.",
  section: "Entity Component System",
  tags: ["enabled","Entity","render.enabled"],
  docs: ["repo/docs/user-manual/ecs/entities.md","repo/docs/user-manual/ecs/components.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
