// Nested loops: a grid of dots from repeat inside repeat
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      fill: #0b132b;
      repeat(7 as a) {
        repeat(7 as b) {
          c: (vec2(a, b) - 3) * .14;
          fill: hsl(fract((a + b) / 14 + .1t), .7, .6), shape(length(pos - c) - .035 - .02sin(t + a + b));
        }
      }
    );
  `,
  say: "Two loops of 7 give 49 steps",
});
