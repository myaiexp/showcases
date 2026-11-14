// PlayCanvas: Safe-area margins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Safe-area margins",
  summary:
    "Phones cover parts of the display; the safe area is the rest. The browser's env(safe-area-inset-*) values are read through a padded probe and applied as the margin of a screen-filling group that holds the essential UI. The example simulates a phone in landscape and draws the unsafe strips.",
  section: "User Interface",
  tags: ["margin","resizecanvas","screen.scale","ELEMENTTYPE_GROUP"],
  docs: ["repo/docs/user-manual/user-interface/safe-area.md","repo/docs/user-manual/user-interface/screens.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
