// Perspective example: Config and update events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config and update events",
  summary:
    "perspective-config-update fires for every restore() and every settings-panel change; perspective-view-update fires as the streaming table changes. Both are logged live.",
  section: "Events",
  tags: ["perspective-config-update", "perspective-view-update", "addEventListener", "update"],
  docs: ["repo/docs/md/how_to/javascript/events.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
