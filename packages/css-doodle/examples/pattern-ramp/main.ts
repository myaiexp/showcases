// ramp(t, stop, …): colors and positions as in a CSS gradient
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "hard edges", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          fill: ramp(length(pos) + .03sin(8atan(pos.y, pos.x) + 2t), #f99a53 .28, #006b50 .28, #00055f .5)
        );
      ` },
    { label: "spread evenly", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          fill: ramp(fract(uv.x + .15t), #f06, #fc0, #0cf, #f06)
        );
      ` },
    { label: "with positions", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          fill: ramp(uv.x + .1sin(4uv.y + 2t), #14213d .1, #fca311 .5, #fff .9)
        );
      ` },
    { label: "numbers", code: `
        @grid: 1 / 100%;
        @content: @pattern(
          fill: ramp(length(pos) * 2 - .2t, 0, 1, 0, 1, 0, 1, 0)
        );
      ` },
  ],
  say: "Stops hold below the first and above the last",
});
