// repeat with a stop test: counting the steps until a sum passes 1
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      s: 0;
      n: 0;
      repeat(64 as k, s > 1) {
        s: s + .02 + .12 * noise(uv * 5 + vec2(t * .2, k * .15));
        n: n + 1;
      }
      fill: ramp(n / 40, #0b132b, #3a86ff, #ffbe0b, #fff);
    );
  `,
  say: "Pixels that get big steps stop early and stay dark",
});
