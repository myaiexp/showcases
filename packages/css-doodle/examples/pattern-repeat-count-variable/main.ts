// repeat(n as i): a count held in a variable
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      n: 160;
      fill: #0b132b;
      repeat(n as i) {
        a: i * 2.39996 + t * .2;
        r: .47 * sqrt(i / n);
        fill: hsl(fract(i / n + .1t), .8, .6), shape(length(pos - r * vec2(cos(a), sin(a))) - .012 - .014 * i / n);
      }
    );
  `,
  say: "k counts from 0; n is a variable that never changes",
});
