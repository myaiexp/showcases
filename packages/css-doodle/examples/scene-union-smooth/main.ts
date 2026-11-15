// smooth: rounded joins that blend the colors
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "smooth: 0", code: `
        @grid: 1 / 100%;
        @content: @scene(
          union {
            smooth: 0;
            fill: #fc0;
            sphere { r: .5 }
            sphere { r: .35; move: .55 .3 0; fill: #f06 }
          }
          view: 0 10;
        );
      ` },
    { label: "smooth: 0.08", code: `
        @grid: 1 / 100%;
        @content: @scene(
          union {
            smooth: 0.08;
            fill: #fc0;
            sphere { r: .5 }
            sphere { r: .35; move: .55 .3 0; fill: #f06 }
          }
          view: 0 10;
        );
      ` },
    { label: "smooth: 0.15", code: `
        @grid: 1 / 100%;
        @content: @scene(
          union {
            smooth: 0.15;
            fill: #fc0;
            sphere { r: .5 }
            sphere { r: .35; move: .55 .3 0; fill: #f06 }
          }
          view: 0 10;
        );
      ` },
    { label: "smooth: 0.3", code: `
        @grid: 1 / 100%;
        @content: @scene(
          union {
            smooth: 0.3;
            fill: #fc0;
            sphere { r: .5 }
            sphere { r: .35; move: .55 .3 0; fill: #f06 }
          }
          view: 0 10;
        );
      ` },
  ],
  say: "The small sphere has its own fill; the big one takes the group's",
});
