// A pattern as the background of ::after
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100% / #14213d;
    ::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: @pattern(
        v: sin(8uv.x + 2t) + sin(8uv.y - t) + sin(8(uv.x + uv.y) + t);
        fill: hsl(fract(v / 6 + .5), .7, .55);
      );
    }
  `,
  say: "The pattern sizes itself to the pseudo-element",
});
