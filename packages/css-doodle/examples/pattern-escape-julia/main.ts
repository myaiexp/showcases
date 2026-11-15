// escape(z, c): a Julia set that starts from z
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      c: .75 * vec2(cos(.5t), sin(.7t));
      n: escape(2.6pos, c);
      fill: match(n = 0, #000, hsl(fract(3n + .1t), .8, .5));
    );
  `,
  say: "z is the pixel, c is the constant that changes",
});
