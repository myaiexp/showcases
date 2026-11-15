// plane: everything below y = 0, to cut with
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "move: 0 -0.2 0", code: `
        @grid: 1 / 100%;
        @content: @scene(
          intersect {
            sphere { r: .6; fill: #e76f51 }
            plane { move: 0 -0.2 0 }
          }
          view: 30 35;
        );
      ` },
    { label: "move: 0 0 0", code: `
        @grid: 1 / 100%;
        @content: @scene(
          intersect {
            sphere { r: .6; fill: #e76f51 }
            plane { move: 0 0 0 }
          }
          view: 30 35;
        );
      ` },
    { label: "move: 0 0.3 0", code: `
        @grid: 1 / 100%;
        @content: @scene(
          intersect {
            sphere { r: .6; fill: #e76f51 }
            plane { move: 0 0.3 0 }
          }
          view: 30 35;
        );
      ` },
  ],
  say: "Intersecting with a plane keeps one side",
});
