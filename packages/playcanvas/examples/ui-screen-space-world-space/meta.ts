// PlayCanvas: Screen space and world space
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Screen space and world space",
  summary:
    "A screen-space screen is drawn over the camera view at the size of the canvas; a world-space screen is an entity in the scene whose size in metres is its resolution times its scale. A HUD label and a 1.6 by 0.96 metre sign share a scene; the sign swings and, seen from behind, is not drawn.",
  section: "User Interface",
  tags: ["screenSpace","resolution","scale","ScreenComponent"],
  docs: ["repo/docs/user-manual/user-interface/screens.md","repo/docs/user-manual/user-interface/world-space-ui.md","repo/docs/user-manual/editor/scenes/components/screen.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
