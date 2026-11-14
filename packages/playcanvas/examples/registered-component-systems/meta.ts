// playcanvas example: Registered component systems
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Registered component systems",
  summary: "AppBase runs only the component systems listed in AppOptions. This app registers render, camera and light; the full view tries addComponent for ten component names on a spare entity and shows which return null because their system was left out.",
  section: "Engine",
  tags: ["AppBase","AppOptions","componentSystems","addComponent","app.systems"],
  docs: ["repo/docs/user-manual/engine/bundle-size.md","repo/docs/user-manual/ecs/components.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
