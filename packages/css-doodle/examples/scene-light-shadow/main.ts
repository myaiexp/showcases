// light and shadow: a direction and a shadow strength
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "shadow: 0", code: `
        @grid: 1 / 100%;
        @content: @scene(
          sphere { r: .4; fill: #fc0 }
          box { size: 2 .1 2; move: 0 -.45 0; fill: #eee }
          view: 30 30;
          light: -1 1 .5;
        );
      ` },
    { label: "shadow: 0.4", code: `
        @grid: 1 / 100%;
        @content: @scene(
          sphere { r: .4; fill: #fc0 }
          box { size: 2 .1 2; move: 0 -.45 0; fill: #eee }
          view: 30 30;
          light: -1 1 .5;
          shadow: 0.4;
        );
      ` },
    { label: "shadow: 0.8", code: `
        @grid: 1 / 100%;
        @content: @scene(
          sphere { r: .4; fill: #fc0 }
          box { size: 2 .1 2; move: 0 -.45 0; fill: #eee }
          view: 30 30;
          light: -1 1 .5;
          shadow: 0.8;
        );
      ` },
    { label: "shadow: 1", code: `
        @grid: 1 / 100%;
        @content: @scene(
          sphere { r: .4; fill: #fc0 }
          box { size: 2 .1 2; move: 0 -.45 0; fill: #eee }
          view: 30 30;
          light: -1 1 .5;
          shadow: 1;
        );
      ` },
  ],
  say: "Shapes between the light and a surface darken it",
});
