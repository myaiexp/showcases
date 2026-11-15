// rot(p, a): turning the whole plane by a distance-dependent angle
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      p: rot(pos, 7 * length(pos) - t);
      fill: match(fract(p.x * 8) < .5, #fca311, #14213d);
    );
  `,
  say: "Plain vertical stripes, twisted by rot()",
});
