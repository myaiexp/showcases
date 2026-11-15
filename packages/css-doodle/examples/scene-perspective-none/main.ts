// perspective: none for a parallel view
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "perspective: none", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box*5x5 {
            size: .3;
            round: .03;
            move: nx * .4 - 1.2, 0, ny * .4 - 1.2;
            fill: hsl(n / N, .6, .6);
          }
          view: 45 35;
          perspective: none;
        );
      ` },
    { label: "perspective: 2", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box*5x5 {
            size: .3;
            round: .03;
            move: nx * .4 - 1.2, 0, ny * .4 - 1.2;
            fill: hsl(n / N, .6, .6);
          }
          view: 45 35;
          perspective: 2;
        );
      ` },
    { label: "perspective: 6", code: `
        @grid: 1 / 100%;
        @content: @scene(
          box*5x5 {
            size: .3;
            round: .03;
            move: nx * .4 - 1.2, 0, ny * .4 - 1.2;
            fill: hsl(n / N, .6, .6);
          }
          view: 45 35;
          perspective: 6;
        );
      ` },
  ],
  say: "Same boxes, different cameras",
});
