// segment(p, a, b): string art from lines
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      m: 2 + .2t;
      fill: #fff;
      repeat(90 as k) {
        p: .45 * vec2(cos(k * π / 45), sin(k * π / 45));
        q: .45 * vec2(cos(k * m * π / 45), sin(k * m * π / 45));
        fill: #000, shape(segment(pos, p, q), .008);
      }
    );
  `,
  say: "Point k joins point k × m",
});
