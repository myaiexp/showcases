// dither(x, y): a 4×4 Bayer threshold
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      grid: 64;
      v: uv.x + .25sin(6uv.y + t);
      fill: match(v > dither(x, y), #fff, #000);
    );
  `,
  say: "The brighter the gradient, the more cells pass the threshold",
});
