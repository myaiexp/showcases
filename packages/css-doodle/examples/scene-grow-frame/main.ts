// grow and frame: fatter shapes and hollow shells
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "frame: .05", code: `
        @grid: 1 / 100%;
        @content: @scene(
          subtract {
            sphere { r: .6; frame: .05; fill: #f4a261 }
            box { size: 1; move: .5 .5 .5 }
          }
          view: 40 30;
        );
      ` },
    { label: "grow: .1", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: .5; round: .02; grow: .1; fill: #e9c46a }
          view: 40 30;
        );
      ` },
    { label: "grow: 0", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: .5; round: .02; fill: #e9c46a }
          view: 40 30;
        );
      ` },
  ],
  say: "Both rows reshape the surface",
});
