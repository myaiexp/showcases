// A swizzle on the left: pos.x: abs(pos.x) mirrors everything
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      pos.x: abs(pos.x);
      n: fbm(6pos + vec2(2, 2 + t * .5)) - length(pos);
      fill: match(n > .2, #000, #fff);
    );
  `,
  say: "Folding pos.x makes the left half a copy of the right",
});
