// Perspective example: addPanel() and layout events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "addPanel() and layout events",
  summary:
    "addPanel() places a new panel as a column and returns its id; removePanel() and setActivePanel() change the set and the selection. perspective-layout-update and perspective-active-panel-update report the two separately.",
  section: "Layouts",
  tags: ["addPanel", "removePanel", "getPanelNames", "setActivePanel", "getActivePanel", "perspective-layout-update", "perspective-active-panel-update"],
  docs: ["repo/docs/md/how_to/javascript/layout.md", "repo/docs/md/how_to/javascript/events.md", "repo/docs/md/how_to/javascript/viewer.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
