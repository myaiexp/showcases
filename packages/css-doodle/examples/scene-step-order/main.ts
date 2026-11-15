// move, rotate and scale run in the order written
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "move, then rotate", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: .5; fill: #555; move: -1.2 0 0 }
          box { size: .5; round: .05; fill: #fc0; move: 1 0 0; rotate: z 40; }
          view: 0 15;
        );
      ` },
    { label: "rotate, then move", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: .5; fill: #555; move: -1.2 0 0 }
          box { size: .5; round: .05; fill: #fc0; rotate: z 40; move: 1 0 0; }
          view: 0 15;
        );
      ` },
    { label: "scale, then move", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: .5; fill: #555; move: -1.2 0 0 }
          box { size: .5; round: .05; fill: #fc0; scale: 1.6 .5 1; move: 1 0 0; }
          view: 0 15;
        );
      ` },
  ],
  say: "Order matters: each step works on the result of the one before",
});
