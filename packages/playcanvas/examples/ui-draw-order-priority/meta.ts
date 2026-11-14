// PlayCanvas: Draw order and screen priority
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Draw order and screen priority",
  summary:
    "Within a screen the hierarchy is the draw order: reparenting an element to its own parent moves it to the front. Between screens, priority decides: two overlapping screens swap which one is on top by changing priority.",
  section: "User Interface",
  tags: ["reparent","priority","drawOrder","ScreenComponent"],
  docs: ["repo/docs/user-manual/user-interface/draw-order-and-performance.md","repo/docs/user-manual/user-interface/screens.md","repo/docs/user-manual/editor/scenes/components/screen.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
