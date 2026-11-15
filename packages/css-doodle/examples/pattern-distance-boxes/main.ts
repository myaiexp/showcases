// box and shape: strokes along the edge of a distance
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      fill: #fff;
      repeat(12 as k) {
        d: box(rot(pos, k * .12sin(t)), .04 + .036k);
        fill: #000, shape(abs(d), .012);
      }
    );
  `,
  say: "rot(p, a) turns a point, not a matrix",
});
