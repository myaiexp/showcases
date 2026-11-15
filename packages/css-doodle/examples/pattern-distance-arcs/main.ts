// arc(p, r, a, b): strokes with round ends
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      fill: #fff;
      repeat(8 as k) {
        a: k + t * (k - 3.5) / 4;
        fill: #000, shape(arc(pos, .08 + .045k, a, a + π), .03);
      }
    );
  `,
  say: "Each arc spans half a turn",
});
