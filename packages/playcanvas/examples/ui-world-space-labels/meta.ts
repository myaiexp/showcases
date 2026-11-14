// PlayCanvas: Labels over characters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Labels over characters",
  summary:
    "Two ways to label a character: a world-space screen as its child, turned to the camera each frame so it shrinks with distance, and a screen-space element placed every frame from camera.worldToScreen so it keeps its size. Both characters walk towards and away from the camera.",
  section: "User Interface",
  tags: ["worldToScreen","screenSpace","resolution","viewMatrix","ScreenComponent"],
  docs: ["repo/docs/user-manual/user-interface/world-space-ui.md","repo/docs/user-manual/user-interface/screens.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
