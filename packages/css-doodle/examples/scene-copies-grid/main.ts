// name*XxY: copies in a grid, with nx and ny
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "view 35 25", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: 1 .06 .7; move: 0 .28 0; round: .02 }
          box*2x2 { size: .06 .5 .06; move: nx * .84 - 1.26, 0, ny * .54 - .81 }
          view: 35 25;
        );
      ` },
    { label: "view 120 25", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: 1 .06 .7; move: 0 .28 0; round: .02 }
          box*2x2 { size: .06 .5 .06; move: nx * .84 - 1.26, 0, ny * .54 - .81 }
          view: 120 25;
        );
      ` },
    { label: "view 210 25", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: 1 .06 .7; move: 0 .28 0; round: .02 }
          box*2x2 { size: .06 .5 .06; move: nx * .84 - 1.26, 0, ny * .54 - .81 }
          view: 210 25;
        );
      ` },
    { label: "view 300 25", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box { size: 1 .06 .7; move: 0 .28 0; round: .02 }
          box*2x2 { size: .06 .5 .06; move: nx * .84 - 1.26, 0, ny * .54 - .81 }
          view: 300 25;
        );
      ` },
  ],
  say: "Four legs, written once",
});
